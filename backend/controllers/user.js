// Imports
// Le controlleur logique metier login a besoin de ses deux MDW

// Composant JavaScript pour calculer le SHA256 des chaînes
const sha256 = require('sha256');
// On aura besoin de npm install --save jsonwebtoken
const jwt = require('jsonwebtoken'); // on l'importe ici
// On aura besoin de notre model MDW
const User = require('../models/user');
// On importe le validateur de mot de passe
const passwordValidator = require('../middleware/passwordValidator');
// On importe crypto qui va coder l'email de l'utilisateur
const CryptoJS = require("crypto-js");


// Enregistrement de nos utilisateurs
exports.signup = (req, res, next) => { // on exporte la fonction vers route
	//console.log(req.body)
	if (passwordValidator.validate(req.body.password)) { // controle de la validation du mot de passe
		let key = CryptoJS.enc.Hex.parse(process.env.Crypto_key);
		let iv = CryptoJS.enc.Hex.parse(process.env.Crypto_iv);
		let emailHash = CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString() // cryptage email
		User.count({ // Count the occurrences of elements in the database
			where: { email: emailHash } // cherche les emails
		}).then((data) => {
			//console.log('--ICI AFFICHAGE CREATION USER --' + data)
			if (data === 0) { // si aucun email identique trouvé 
				let hash = sha256(req.body.password) // hashage du password
				const user = new User({// notre modele sequelize va créér un nouveau user
					username: req.body.username,
					email: emailHash, // avec email hashe
					// cryptage du mot de passe email:req.body.email,
					password: hash,  // on va enregistrer le MP de la ligne l.17
					isAdmin: false, // il n'est pas l'admin
				});
				user.save() // on enregistre dans la BD
					.then(() => res.status(201).json({
						user: user, // on transfere l'user au front pour aller dans current user
						token: jwt.sign( // le token
							{ userId: user.id },
							`${process.env.TOKEN}`,
							{ expiresIn: '24h' }
						),
					})) // 201 pour création de ressources
					.catch(error => res.status(400).json({ error: error }));
			} else {
				return res.status(400).json({ error: ' email utilisateur déjà existant !' })
			}
		})
	}
	else {
		return res.status(400).json({ error: 'Le mot de passe doit contenir au moins un chiffre, une minuscule, une majuscule et être composé de 8 caractères minimum !' })
	}
};

// Connecter les utilisateurs existants
exports.login = (req, res, next) => { // on exporte la fonction vers route
	let key = CryptoJS.enc.Hex.parse(process.env.Crypto_key);
	let iv = CryptoJS.enc.Hex.parse(process.env.Crypto_iv);
	//console.log(CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString())
	User.findOne({// On recupere l'utilisateur dans la base qui correspond a l email entré
		where: {
			email: CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString()
		}
	})
		.then(user => {
			if (!user) { // si email pas bon on renvoie une erreur
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}// Si trouvé alors 
			let hash = sha256(req.body.password)
			//console.log("-- ICI AFFICHE id de l'UTILISATEUR TROUVE --" + user.id)
			if (user.password === hash) {
				res.status(200).json({ // si valable (true) on va renvoyer au F-e un id et un token d'authentification
					user, // renvoi l'id de l'utilisateur
					token: jwt.sign( // le token
						{ userId: user.id },
						`${process.env.TOKEN}`,
						{ expiresIn: '24h' },
					),
				});
			} else {
				return res.status(401).json({ error: "Mot de passe incorrect !" });
			}
		})
		.catch(error => res.status(500).json({ error }));
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res, next) => { // on exporte la fonction vers route delete
	try {
		User.destroy({ // Delete multiple instances
			where: {
				id: Number(req.params.id)// convertion string in number
			}
		})
		return res.status(200).send({
			message: "Utilisateur supprimé"
		})
	} catch (err) {
		return res.status(500).json({
			err
		});
	}
}

// Chercher un Utilisateur
exports.getOneUser = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
	const userId = decodedToken.userId;
	User.findOne({
		where: {
			id: userId,
		},
	})
		.then((user) => res.status(200).json({
			user
		}))
		.catch((err) => res.status(401).json({
			err
		}));
};

// Chercher tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
	User.findAll()
		.then((users) => res.status(200).json({
			users
		}))
		.catch((err) => res.status(401).json({
			err
		}));
};
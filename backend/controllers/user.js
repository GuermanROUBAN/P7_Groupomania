// Le controlleur logique metier login a besoin de ses deux MDW

// On aura besoin du modele de cryptage pour les mots de passe npm install --save bcrypt
const bcrypt = require('bcrypt'); //on l'importe ici

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
exports.signup = (req, res, next) => {
	console.log('Request')
	if (passwordValidator.validate(req.body.password)) { // controle de la validation du mot de passe
		let key = CryptoJS.enc.Hex.parse(process.env.Crypto_key);
		let iv = CryptoJS.enc.Hex.parse(process.env.Crypto_iv);
		let emailHash = CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString()
		User.count({
			where: { email: emailHash }
		}).then((data) => {
			console.log(data)
			if (data === 0) {
				let hash = sha256(req.body.password)
				const user = new User({// notre modele sequelize va créér un nouveau user
					username: req.body.username,
					email: emailHash,
					// cryptage du mot de passe email:req.body.email,
					password: hash,  // on va enregistrer le MP de la ligne l.17
					isAdmin: false,
				});
				user.save() // on enregistre dans la BD
					.then(() => res.status(201).json({ message: 'Utilisateur créé !' })) // 201 pour création de ressources
					.catch(error => res.status(400).json({ error }));
			} else {
				return res.status(400).json({ message: ' email utilisateur déjà existant !' })
			}
		})
	}
	else {
		return res.status(400).json({ message: 'Le mot de passe doit contenir au moins un chiffre, une minuscule, une majuscule et être composé de 8 caractères minimum !' })
	}
};

// Connecter les utilisateurs existants
exports.login = (req, res, next) => {
	let key = CryptoJS.enc.Hex.parse(process.env.Crypto_key);
	let iv = CryptoJS.enc.Hex.parse(process.env.Crypto_iv);
	User.findOne({ email: CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString() }) // On recupere l'utilisateur dans la base qui correspond a l email entré
		.then(user => {
			if (!user) { // si email pas bon on renvoie une erreur
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}// Si trouvé alors 
			let hash = sha256(req.body.password)
			if (user.password === hash) {
				res.status(200).json({ // si valable (true) on va renvoyer au F-e un id et un token d'authentification
					userId: user._id,
					token: jwt.sign(
						{ userId: user._id },
						`${process.env.TOKEN}`,
						{ expiresIn: '24h' }
					)
				});
			} else {
				return res.status(401).json({ error: "Mot de passe incorrect !" });
			}
		})
		.catch(error => res.status(500).json({ error }));
};

// Supprimer un utilisateur

exports.deleteUser = async (req, res, next) => {
	try {
		User.destroy({
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
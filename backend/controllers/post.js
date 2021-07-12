const Post = require('../models/post');


// Creation d'une post

exports.create = (req, res, next) => {

	let idUSERS = req.body.userId;
	let title = req.body.title;
	let content = req.body.content;
	let attachement = req.body.attachement;

	if (idUSERS == null || title === "" || content === "" || attachement === "") {
		return res.status(400).json({ 'error': 'missing parameters > postCtrl.js(1)' });
	}
	const post = new Post({
		idUSERS: idUSERS,
		title: title,
		content: content,
		attachement: attachement,
	});
	post.save()
		.then(() => res.status(201).json({ message: 'post enregistrée !' })) // 201 pour création de ressources
		.catch(error => res.status(400).json({ error }));
}

// Modification post
exports.modifyPost = (req, res, next) => {

	let title = req.body.title;
	let content = req.body.content;
	let attachement = req.body.attachement;
	let idPost = req.params.id;

	Post.update({
		title: title,
		content: content,
		attachement: attachement,
	},
		// La methode .update prend 2 arguments: 1er {nouvelles values}, 2eme {la où elles doivent etre inscrites}
		{
			where:
				{ id: idPost },

		}) // permet de mettre à jour post, {objet} que nous passons en argument.
		// Nous utilisons aussi id passé dans la demande et le remplacons par le post passé comme second argument.
		.then(() => res.status(200).json({ message: "post modifiée !" }))
		.catch(error => res.status(400).json({ error }));
}



// Supprimer un utilisateur

exports.deletePost = (req, res, next) => {
	try {
		Post.destroy({
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


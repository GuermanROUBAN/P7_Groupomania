const Post = require('../models/post');


// Creation d'une sauce

exports.create = (req, res, next) => {

	let idUSERS = req.body.idUSERS
	let title = req.body.title
	let content = req.body.content
	let attehement = req.body.attachement

	if (idUSERS === "" || title == "" || content == "") {
		return res.status(400).json({ 'error': 'missing parameters > postCtrl.js(1)' });
	}
	Post.create({
	}).then((data) => {
		console.log(data)
		if (data === 0) {
			const post = newPost({
				idUSERS: req.body.idUSERS,
				title: req.body.title,
				content: req.body.content,
				attehement: req.body.attachement

			})
			post.save()
				.then(() => res.status(201).json({ message: 'post créé !' }))
				.catch(error => res.status(400).json({ message: 'Impossible de créér un post!' }));
		} else {
			return res.status(400).json({ message: 'post déjà existant !!' })
		}
	})
}

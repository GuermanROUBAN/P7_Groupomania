const User = require('../models/user')


function checkIfAdmin(req, res) {
	let userId = req.body.userId // On a recu l'id de l'utilisateur
	User.findOne({
		where: {
			id: userId
		}
	})
		.then(user => {
			if (user.isAdmin) {
				return true;
			} else {
				return false
			}
		})
		.catch(err => {
			return res.status(500).json({ 'error': err })
		})
}
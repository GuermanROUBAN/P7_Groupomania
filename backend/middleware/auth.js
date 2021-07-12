

const jwt = require('jsonwebtoken'); // permet de securiser les requettes

module.exports = (req, res, next) => {
    console.log('middelwar started')
    try { //
        const token = req.headers.authorization.split(' ')[1];
        console.log("token" + token)
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
        console.log("decodedToken: " + decodedToken)
        console.log('mytoken' + process.env.TOKEN)
        const userId = decodedToken.userId;
        console.log("userId " + userId)
        if (req.body.userId && Number(req.body.userId) !== Number(userId)) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
        console.log('test reussi')
        res.status(401).json({ error: error | 'Requête non authentifiée' });
    }
}

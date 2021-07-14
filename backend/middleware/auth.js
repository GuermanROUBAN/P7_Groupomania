

const jwt = require('jsonwebtoken'); // permet de securiser les requettes

module.exports = (req, res, next) => {
    console.log('--ICI START MIDDLEWARE--')
    try { //
        // On recoit l'id dans le TOKEN
        const token = req.headers.authorization;
        //const token = req.headers.authorization.split(' ')[1];
        console.log("token" + token)
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // Decodage
        console.log("decodedToken: " + decodedToken)
        console.log('mytoken' + process.env.TOKEN)
        const userId = decodedToken.userId; // On prend l'id dans le token et on le passe dans userId
        console.log("userId " + userId)

        if (!userId)// on verifie si userId est présent => controle sur l'erreur
        {
            return res.status(500).json({ 'error': "User Id non trouvé" })
        }
        req.body.userId = userId

        next() // MDW a fini son travail 


        // if (req.body.userId && Number(req.body.userId) !== Number(userId)) {
        //     throw 'User ID non valable !';
        // } else {
        //     next();
        // }
    } catch (error) {
        console.log(error)
        console.log('--ICI FIN MIDDLEWARE--')
        res.status(401).json({ error: 'Requête non authentifiée' });
    }
}

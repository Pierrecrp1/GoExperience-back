const jwt = require('jsonwebtoken');
require('dotenv').config()

class middleware {
    verifyJWT(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.TOKEN_GEN_SEED);

            // if (decodedToken.admin == false) {res.status(403).send("Vous n'avez pas les permissions nécessaires"); return;}

            req.auth = {
                userId: decodedToken.userId,
                admin: decodedToken.admin
            };
            next();
        } 
        catch(error) {
            res.status(401).send('Token invalide');
        }
    };

}

 module.exports = middleware;
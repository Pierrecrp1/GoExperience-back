const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const model = require('./users.model');
require('dotenv').config()
const saltRounds = 10;

class usersController {
    async createUser(req, res) {
        console.log(req.body)
        if (req.body['email'] == null) {res.sendStatus(400); return}
        if (req.body['password'] == null) {res.sendStatus(400); return}

        let password = req.body['password'];
        
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            req.body['password'] = hash;
            req.body['admin'] = false;
            await model(req.body).save()
                .then((userCreated)=>{res.status(201).send(userCreated)})
                .catch((err)=>{res.status(400).send(err)})
        });
    }   

    async loginUser(req, res) {
        if (req.body['email'] == null | !req.body['email']) res.sendStatus(400)
        if (req.body['password'] == null) res.sendStatus(400)

        let password = req.body['password'];

        let query = await model.find({email: req.body['email']})

        if (!query[0]) {res.status(400).send('Email not found'); return;}
        if (query == []) {res.status(400).send('Email not found'); return;}
        else {
            bcrypt.compare(password, query[0]['password'], function(err, result) {
                if (result) {

                    let token = jwt.sign({userId:query[0]['_id'], admin:query[0]['admin']}, process.env.TOKEN_GEN_SEED, {algorithm: 'HS256', expiresIn:'24h'})

                    res.status(200).send({
                        userId: query[0]['_id'],
                        token: token
                    })
                }
                else res.status(400).send('Wrong password')
            });
        }

    }

}

module.exports = usersController;
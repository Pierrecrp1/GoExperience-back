const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');

const app = express();
app.use(express.json());

require('dotenv').config()

mongoose.connect("mongodb+srv://pierrecrp:pierrecrp@cluster0.2wniwoe.mongodb.net/GoExperience")
.then(() => {
    console.log('Connexion à la BDD Réussie');
}).catch((err)=>{
    console.log(err);
})

app.use(function (req, res, next) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Autorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

const {Glob} = require('glob')

// const g3 = new Glob('./*/*.routes.js', { withFileTypes: true })
// g3.stream().on('data', path => {
//     console.log(path)
//   const route = require(path.fullpath())

//   let routeName = path.fullpath().split('\\');
//   routeName = routeName[routeName.length-2];

//   app.use("/api/"+routeName, route);
// })

var activities = require('./activities/activities.routes.js')
app.use('/api/activities', activities)

var users = require('./users/users.routes.js')
app.use('/api/users', users)

app.use(cors({
    origin: "*",
    credentials: true,
}));

app.listen(3001, () => {
    console.log(`Serveur en écoute sur le port ${3001}`)
})
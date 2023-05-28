const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "name": {type:String, unique:true, required:true},
    "types": {type:[String], enum:['Aquatique', 'Course', 'Jeux pour enfants', 'Vélo', 'BMX/Skate/Trotinette/Rollers', 'Football', 'Basketball', 'Pêche', 'Bowling', 'Lasergame', 'Paintball', 'Karting', 'Escalade', 'Piscine', 'Patinoire', 'Escape game', 'Plage', 'Musée','Monument','Jardins','Parc forestier','Parc aquatique',"Parc d'attractions",'Zoo','Boutique','Cinéma','Théâtre','Bar','Club','Bien-être','Médecine','Soins','Santé','Salles de jeux'], required:true},
    "likes": { type: [String], default: [] },
    "description": { type: String, required: true },
    "image": {type: String},
    "position": {
        "longitude": {type: Number},
        "latitude": {type: Number}
    },
    "city": {type: String, required: true},
    "id_owner": {type:String, required: true}
})

const model = mongoose.model('activity', schema)

module.exports = model;
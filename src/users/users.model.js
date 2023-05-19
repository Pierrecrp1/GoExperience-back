const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "email": {type:String, unique:true, required:true},
    "password": {type: String, required:true},
    "admin": {type: Boolean, required:true}
})

const model = mongoose.model('users', schema)

module.exports = model;
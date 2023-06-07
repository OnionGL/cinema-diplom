const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
   fullName: {
      type: String,
      require: true
   },
   email: {
      type: String,
      require: true
   },
   passwordHash: {
      type: String,
      require: true
   },
   longitube: {
      type: Number
   },
   latitube: {
      type: Number
   },
   listSelectedFilms: {
      type: Array
   },
},{
   timestamps: true
});

module.exports = mongoose.model('User' , UserModel);
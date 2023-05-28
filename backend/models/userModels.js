const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
   fullName: {
      type: String,
   },
   email: {
      type: String
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
   googleId: {
      type: Number
   }
},{
   timestamps: true
});

module.exports = mongoose.model('User' , UserModel);
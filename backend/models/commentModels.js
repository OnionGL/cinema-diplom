const mongoose = require('mongoose');

const CommentModel = new mongoose.Schema({
   idCinema: {
      type: Number,
      require: true
   },
   listComment: {
      type: Array
   },
},{
   timestamps: true
});

module.exports = mongoose.model('Comment' , CommentModel);
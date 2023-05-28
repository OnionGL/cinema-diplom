const User = require('../models/userModels'); 

const getUserList = (req , res) => {
   try {
      User.find({} , (err , result) => {
         return res.json({
            userList: result
         })
      })
   } catch (error){
      res.status(500).json({
         message: `Get list user was error ${error}`
      })
   }
}

const getUserById = (req , res) => {
   try {
      User.findById(req.params.id)
      .then(user => {
         if(!user) return res.status(404).json({message: 'Пользователь не найден'});
         return res.status(200).json(user);
      })
   } catch (err) {
      return res.status(500).json({
         message: 'Произошла ошибка!'
      })
   }
}

module.exports = {getUserList , getUserById};
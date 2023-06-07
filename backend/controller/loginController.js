const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModels');
const {validationResult} = require('express-validator');


const loginUser = async (req , res) => {
   console.log("login" , req.body)
   try {
      const user = await UserModel.findOne({email: req.body.email});

      if(!user){
         return res.status(404).json({
            message: 'Неверный логин или пароль'
         })
      }

      const isValidPass = await bcrypt.compare(req.body.password , user._doc.passwordHash);

      if(!isValidPass){
         return res.status(404).json({
            message: 'Неверный логин или пароль'
         })
      }

      const token = jwt.sign({
         _id: user.id
      },
         'secret3015',
      {
         expiresIn: '30d'
      })

      const { passwordHash , ...userData } = user._doc;

      res.json({...userData,token});

   } catch (error) {
      console.log(error);
      res.status(500).json({
         message: 'Не удалось авторизоваться'
      })
   }
}

const registerUser = async (req ,res) => {
   try {
      const errors = validationResult(req);

      if(!errors.isEmpty()){
         return res.status(400).json(errors.array());
      }

      const password = req.body.password;

      const salt = await bcrypt.genSalt(10);

      const hash = await bcrypt.hash(password , salt);


      const doc = new UserModel({
         email: req.body.email,
         longitube: 1231321312321,
         latitube: 12313213123213,
         passwordHash: hash
      });

   const newUser = await doc.save();

   const token = jwt.sign({
      _id: newUser.id
   },
      'secret3015',
   {
      expiresIn: '30d'
   })

   const { passwordHash , ...userData } = newUser._doc;

   res.json(
      {
         ...userData,
         token
      }
      );
   } catch (error) {
      console.log(error);
      res.status(500).json({
         message: 'Не удалось зарегестрироваться'
      })
   }
}

const checkAuthController = async (req , res) => {
      try { 

         const user = await UserModel.findById(req.userId)

         if(!user) {
            return res.status(500).json({
               message: 'Пользователь не найден'
            })
         }

         const {passwordHash , ...userData} = req._doc;

         res.json(userData)
      } catch (err) {
         res.status(500).json({
            message: 'Произошла ошибка'
         })
      }
}

module.exports = {loginUser ,registerUser , checkAuthController};

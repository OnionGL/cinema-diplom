const express = require('express');
const cors = require('cors');
const mongoDBConnect = require('./db');
const mongoose = require('mongoose');
const User = require('./models/userModels'); 
const {loginUser ,registerUser , checkAuthController} = require('./controller/loginController')
const {checkAuth} = require('./utils/checkAuth');
const authValidation = require('./validations/authValidators');


const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

const start = async () => {
   try {
      app.listen(PORT, () => console.log(`server started pn port ${PORT}`));
      mongoDBConnect()
   } catch (e) {
      console.log(e);
   }
}


app.post('/user' , async (req , res) => {
   console.log(req.body.data)
   if(!req.body.data) res.json({message: 'нет данных'})
   const newUser = {
      fullName: req.body.data.displayName,
      email: req.body.data.email,
      longitube: 12.31233321,
      latitube: 12.312312,
      listSelectedFilms: [],
      googleId: req.body.data.uid
   }
   const user = new User(newUser)
   const isAlredy = await User.findOne({googleId: req.body.data.uuid})
   if(isAlredy){
      return res.json({message: "Авторизация прошла успешно"})
   }
   user.save()
   return res.json({message: "Пользователь добавлен"})
})

app.get('/userList' , async (req , res) => {
   const users = await User.find()
   return res.json(users)
})

app.patch('/userUpdate' , async (req , res) => {
   const findUser = await User.find({googleId: 1})
   const update = {$set: {listSelectedFilms: [...findUser[0].listSelectedFilms , 2]}}
   await User.updateOne({googleId: 1} , update)
   res.json({message: "Обновление прошло успешно"})
})


app.post('/login' , loginUser)

app.post('/register' , authValidation , registerUser)

app.get('/me' , checkAuth , checkAuthController)

start();



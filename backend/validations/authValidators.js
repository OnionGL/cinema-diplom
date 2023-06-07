const {body} = require('express-validator');

const authValidation = [
   body('email' , 'Неверный формат почты').isEmail(),
   body('password' , 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
   body('avatarUrl' , 'Неверная ссылка на аватарку').optional().isURL(),
]


module.exports = authValidation;
import React , {useState} from 'react'
import style from './Login.module.css'
import { signInWithPopup , GoogleAuthProvider } from 'firebase/auth'
import { authentication } from '../../API/Firebase.js'
import { loginUser , registerUser } from '../../MongoAPI/mongoDB'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function Login() {

   const dispatch = useDispatch()
   
   const history = useNavigate()

   const [login , setLogin] = useState('')

   const [password , setPassword] = useState('')

   const SignInWithGogle = () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(authentication , provider)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    }
    const loginSuccess = (userId , token) => ({
      type: 'LOGIN_SUCCESS',
      payload: { userId },
    });

    const Login = () => {
       const User = {
         email: login,
         password: password
       }
       loginUser(User).then(data => {
         const token = data.data.token
         const userId = data.data._id
         if(data.status == 200) {
           dispatch(loginSuccess(userId))
           localStorage.setItem('user' , userId)
           history('/cinema')
         }
      })
    }

    const Register = () => {
      const User = {
         email: login,
         password: password
       }
       registerUser(User).then(data => {
          if(data.status == 200) {
            history('/cinema')
          }
       })
    }

   return (
      <div className={style.login}>
         <div style={{display: 'flex' , flexDirection: 'column' , gap: 10 , width: 550}}>
         <input placeholder='Логин' onChange={(e) => setLogin(e.target.value)} className={style.input} type="text" />
         <input placeholder='Пароль' onChange={(e) => setPassword(e.target.value)} className={style.input} type="password" />
         <div style={{display: 'flex' , justifyContent: 'space-between'}}>
            <button onClick={Register} className={style.button}>
               Регистрация              
            </button>
            <button onClick={Login} className={style.button}>
               Вход
            </button>
         </div>
         </div>
      </div>
   )
}

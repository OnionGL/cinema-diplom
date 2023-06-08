import React , {useState} from 'react'
import style from './Login.module.css'
import { signInWithPopup , GoogleAuthProvider } from 'firebase/auth'
import { authentication } from '../../API/Firebase.js'
import { loginUser , registerUser } from '../../MongoAPI/mongoDB'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function Login() {

   const [loading , setLoading] = useState(false)

   const [error , setError] = useState(false)

   const dispatch = useDispatch()
   
   const history = useNavigate()

   const [login , setLogin] = useState('')

   const [password , setPassword] = useState('')

    const loginSuccess = (userId , token) => ({
      type: 'LOGIN_SUCCESS',
      payload: { userId },
    });

    const Login = () => {
       setError(true)
       setLoading(true)
       const User = {
         email: login,
         password: password
       }
       loginUser(User).then(data => {
          
         const token = data.data.token
         const userId = data.data._id
         if(data.status == 200) {
           setLoading(true)
           dispatch(loginSuccess(userId))
           localStorage.setItem('user' , userId)
           history('/cinema')
         }
      }).catch(err => {
         if(err) {
            setLoading(false)
            setError(true)
         }
      })
    }

    const Register = () => {
      setError(true)
      setLoading(true)
      const User = {
         email: login,
         password: password
       }
       registerUser(User).then(data => {
         const userId = data.data._id
          if(data.status == 200) {
            setLoading(false)
            dispatch(loginSuccess(userId))
            localStorage.setItem('user' , userId)
            history('/cinema')
          }
       }).catch(err => {
         if(err) {
            setLoading(false)
            setError(true)
         }
       })
    }

   return <>
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
         <div style={{color: '#fff' , fontWeight: 700 , fontSize: 20}}>
            {loading && "Загрузка..."}
         </div>
         <div style={{color: 'red' , fontWeight: 700 , fontSize: 20}}>
            {error && !loading && "Данные введены некоректно"}
         </div>
         </div>
      </div>
   </>
}

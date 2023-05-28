import React from 'react'
import style from './Login.module.css'
import { signInWithPopup , GoogleAuthProvider } from 'firebase/auth'
import { authentication } from '../../API/Firebase.js'
export default function Login() {
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
   return (
      <div className={style.login}>
         <button type="button" onClick={SignInWithGogle} className={style.login_with_google_btn}>
               Sign in with Google
         </button>
      </div>
   )
}

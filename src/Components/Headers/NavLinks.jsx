import { Link } from 'react-router-dom';
import style from './Headers.module.css'
import { authentication } from '../../API/Firebase.js'
import {useAuthState} from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const NavLinks = (props) => {
   const [user] = useAuthState(authentication)
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

return<>

<div className={style.headers} style={{gap: 50}}>
<div className="container" style={{gap: 50}}>
      <div className="row" style={{gap: 50}}>
         <div onClick = {() => props.isMobile && props.closeMobMenu()} className={style.logo + ' ' + "col-md-2"}>
            <Link to={"/cinema"}><h1>MApp</h1></Link>
         </div>
         <div style={{gap: 50}} className={style.nav_menu + ' ' + "col-md-4" + ' ' + "col-xl-6" + ' ' + "col-lg-5"+ ' ' + "d-flex" + ' ' + "align-items-center" + ' ' + "justify-content-between"}>
         {user ? <button style={{whiteSpace: 'nowrap'}} type="button" onClick={() => authentication.signOut()} className={style.login_with_google_btn}>
  Logout
</button> : <button style={{whiteSpace: 'nowrap'}} type="button" onClick={SignInWithGogle} className={style.login_with_google_btn}>
  Sign In
</button>}

            {user && <Link onClick = {() => props.isMobile && props.closeMobMenu()}  className={style.best} to={"/recommendations/you"}>
My recommendations</Link>}
            {user && <Link onClick = {() => props.isMobile && props.closeMobMenu()}  className={style.best} to={"/recommendations/people"}>Region Recommendations</Link>}
            <Link onClick = {() => props.isMobile && props.closeMobMenu()}  className={style.best} to={"/cinema"}>Best</Link>
            <button className={style.button_filter} onClick={(e) => props.filter ? props.setFilter(false) : props.setFilter(true)}>Filter</button>
            <form style={{display: 'flex', gap: 10}} className={style.input__form} onSubmit={(e) => props.SubmitForm(props.value)}>
               <input style={{border: 'none' , outline: 'none' , borderRadius: 8}} onChange={(e) => props.setValue(e.target.value)} placeholder="Поиск"
               className={style.inputSearch}/>
               <div className={style.search}></div>
               <button onClick={() => props.SubmitForm(props.value)}>Найти</button>
            </form>
         </div>
         </div>
         </div>
</div>
</>
}
export default NavLinks;
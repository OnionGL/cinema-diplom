import { Link } from 'react-router-dom';
import style from './Headers.module.css'
import { authentication } from '../../API/Firebase.js'
import {useAuthState} from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { getLogin } from '../../redux/login-selector';

const NavLinks = (props) => {
   const dispatch = useDispatch()
   const [user] = useAuthState(authentication)
   const SignInWithGogle = () => {
      
    }
    const logout = () => ({
      type: 'LOGOUT',
    });
    const isAuthenticated = useSelector(getLogin);
    const logoutUser = () => {
      localStorage.removeItem('user')
      dispatch(logout())
    }
return<>

<div className={style.headers} style={{gap: 50}}>
<div className="container" style={{gap: 50}}>
      <div className="row" style={{gap: 50}}>
         <div onClick = {() => props.isMobile && props.closeMobMenu()} className={style.logo + ' ' + "col-md-2"}>
            <Link to={"/cinema"}><h1>MApp</h1></Link>
         </div>
         <div style={{gap: 50}} className={style.nav_menu + ' ' + "col-md-4" + ' ' + "col-xl-6" + ' ' + "col-lg-5"+ ' ' + "d-flex" + ' ' + "align-items-center" + ' ' + "justify-content-between"}>
         {isAuthenticated ? <button style={{whiteSpace: 'nowrap'}} type="button" onClick={() => logoutUser()} className={style.login_with_google_btn}>
  Выход
</button> : <Link style={{whiteSpace: 'nowrap'}} type="button" to={"/login"} className={style.login_with_google_btn}>
  Вход
</Link>}

            {isAuthenticated && <Link onClick = {() => props.isMobile && props.closeMobMenu()}  className={style.best} to={"/recommendations/you"}>Рекомендации</Link>}
            {/* {isAuthenticated && <Link onClick = {() => props.isMobile && props.closeMobMenu()}  className={style.best} to={"/recommendations/people"}></Link>} */}
            <Link onClick = {() => props.isMobile && props.closeMobMenu()}  className={style.best} to={"/cinema"}>Лучшие</Link>
            <button className={style.button_filter} onClick={(e) => props.filter ? props.setFilter(false) : props.setFilter(true)}>Фильтры</button>
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
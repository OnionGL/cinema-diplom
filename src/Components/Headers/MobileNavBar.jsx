import React , {useState} from 'react'
import NavLinks from './NavLinks';
import style from './Headers.module.css'
import {CgMenuRound} from 'react-icons/cg'
import {CgCloseO} from 'react-icons/cg'

  
 

const MobileNavBAr = (props) => {
   const [open , setOpen] = useState(false)
   const humburgerIcon = <CgMenuRound className={style.Hamburger} size='70px' color='white' 
      onClick={(e) => setOpen(!open)}/>
   const closeIcon = <CgCloseO className={style.Hamburger} size='70px' color='white' 
      onClick={(e) => setOpen(!open)}/>
   const closeMobMenu = () => {
      setOpen(false)
   }
   return( 
      <nav className={style.MobileNavigation}> 
      {open ? closeIcon : humburgerIcon}
      {open ? <NavLinks isMobile = {true} closeMobMenu={closeMobMenu} filter = {props.filter} setFilter = {props.setFilter} SubmitForm={props.SubmitForm} value={props.value} setValue={props.setValue}/> : null}
   </nav>
   )

}
export default MobileNavBAr
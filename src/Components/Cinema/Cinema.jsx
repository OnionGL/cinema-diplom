import React,{useEffect , useState} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import style from "./Cinema.module.css"
import { NavLink, useLocation } from 'react-router-dom';
import { getCinemaSelectorSuper, getTotalPageSelector , getIsFetchingSelector } from '../../redux/cinema-selector';
import { getCinemaAPI } from '../../redux/cinema-reducer';
import Pagination from '@mui/material/Pagination';
import Preloader from '../../Preloader/Preloader';
import { useNavigate } from 'react-router-dom';
import { getLogin } from '../../redux/login-selector';



const Cinema = ({cinemaPage = 1}) => {
   const location = useLocation()
   const dispatch = useDispatch()
   const isAuthenticated = useSelector(getLogin);
   const [page , setPage] = useState(cinemaPage)
   const cinema = useSelector(getCinemaSelectorSuper)
   const totalPage = useSelector(getTotalPageSelector)
   const isFetching = useSelector(getIsFetchingSelector)
   useEffect(() => {
      console.log(location.pathname !== '/recommendations/you')
      dispatch(getCinemaAPI(1))
   }, [dispatch])
   useEffect(() => {
      dispatch(getCinemaAPI(page))
   },[page])
   return <>
               {cinemaPage && (location.pathname !== '/recommendations/you' && location.pathname !== '/recommendations/people') && <Pagination style={{
                  background: '#280670',
                  paddingTop: 20,
               }} onChange={(_ ,value) => setPage(value)} count={totalPage} color="secondary" />}
      {isFetching ? <Preloader /> : 
      <div  className={style.cinema}>
         <div className="container">
               <div className="row">
               <div className={style.number__container + ' ' + "col-md-12"}>
               </div>
                     <div className="container">
               <div className="row">
                     {cinema.map(item =>  
               <div style={{margin: 20}} className={style.cinema__container + ' ' + "col-md-6 col-xl-3 col-lg-4"}>
                  <div className={style.cinema__info} >
                     <div className={style.cinema__info_container}>
                     <p className={item.rating >=8.5 ? style.rating__color_8_10 : style.rating__color_0_8}>{item.rating}</p>
                     <div className = {style.cinema__name}>
                        {item.nameRu}
                     </div>
                     <div className = {style.cinema__year}>
                        Год : {item.year}
                     </div>
                     <div className={style.cinema__length}>
                        Продолжительность : {item.filmLength}
                     </div>
                     </div>
                  <NavLink to={"/cinemainfo/" + item.filmId}><img alt="poster" className = {style.cinema__imgage} src={item.posterUrl}/></NavLink>
                  </div>
                  <h2>{item.nameRu}</h2>
         </div>)}
         </div>
         </div>
         </div>
         </div>
      </div>
}
   </>
}
export default Cinema;
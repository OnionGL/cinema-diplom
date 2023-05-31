import React,{useEffect , useState} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import style from "./SearchByKeyword.module.css"
import { NavLink, useParams } from 'react-router-dom';
import { getCinemaSearchSelector, getIsFetchingSearchSelector, getTotalPageSearchSelector } from '../../redux/cinemaBySearch-selector';
import { getSearchCinemaAPI } from '../../redux/searchByKeyword-reducer';
import Pagination from '@mui/material/Pagination';
import Preloader from '../../Preloader/Preloader';


const SearchByKeyword = () => {
   const { value } = useParams()
   const dispatch = useDispatch()
   const [page , setPage] = useState(1)
   const cinema = useSelector(getCinemaSearchSelector)
   const totalPage = useSelector(getTotalPageSearchSelector)
   const isFetching = useSelector(getIsFetchingSearchSelector)
   useEffect(() => {
      dispatch(getSearchCinemaAPI(value,1))
   }, [dispatch])
   useEffect(() => {
      dispatch(getSearchCinemaAPI(value,page))

   }, [page])
   return <>
   <Pagination style={{
                  background: '#280670',
                  paddingTop: 20,
               }} onChange={(_ ,value) => setPage(value)} count={totalPage} color="primary" />
      {isFetching ? <Preloader /> : 
      <div  className={style.cinema}>
         <div className="container">
               <div className="row">
               <div className={style.number__container + ' ' + "col-md-12"}>
               </div>
               {cinema.map(item =>  
               <div style={{margin: 20}} className={style.cinema__container + ' ' + "col-md-6" + ' ' + "col-xl-3" + ' ' + "col-lg-4"}>
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
                  <NavLink to={"/cinemainfo/" + item.filmId}><img  className = {style.cinema__imgage}src={item.posterUrl}/></NavLink>
                  </div>
                  <h2>{item.nameRu}</h2>
         </div>)}
         </div>
         </div>
      </div>
}
   </>
}
export default SearchByKeyword;
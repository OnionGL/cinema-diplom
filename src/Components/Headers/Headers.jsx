import React , {useState , useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import style from './Headers.module.css'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { useDispatch, useSelector } from 'react-redux';
import { setGenres } from '../../redux/searchByFilter-reducer';
import { getGenresSelector } from '../../redux/cinemaByFilter-selector'
import { useTrail, animated } from 'react-spring'
import NavLinks from './NavLinks';
import MobileNavBAr from './MobileNavBar';




const Headers = () => {
   const history = useNavigate()
   const dispatch = useDispatch()
   const genres = useSelector(getGenresSelector)
   const [value , setValue] = useState()  
   const [ratingto , setValueRatingTo] = useState()  
   const [ratingfrom , setValueRatingFrom] = useState()  
   const [yearfrom , setValueYearFrom] = useState()  
   const [yearto , setValueYearTo] = useState()  
   const [genre , setValueGenre] = useState()  
   const [order , setOrder] = useState()  
   const [filter , setFilter] = useState(false) 
   useEffect (() => {
      dispatch(setGenres())
   }, []) 
   const SearchRating = (render, handle, value, un, percent) => {
      setValueRatingFrom(value[0])
      setValueRatingTo(value[1])
   }
   const SearchYear = (render, handle, value, un, percent) => {
      setValueYearFrom(value[0])
      setValueYearTo(value[1])
   }
   const SearchGenre = (value) => {
      setValueGenre(value.target.value)
   }
   const SubmitForm = (value) => {
      history(`/cinema/${value}`)
   }   
   const SearchSort = (value) => {
      setOrder(value.target.value)
   }  
   const SubmitFilter = () => {
      history(`/cinemaByFilter/${ratingfrom === undefined ? 0 : ratingfrom}/${ratingto === undefined ? 10 : ratingto}/${yearfrom === undefined ? 1950 : yearfrom}/${yearto === undefined ? 2020 : yearto}/${genre === undefined ? 1750 : genre}/${order === undefined ? "RATING" : order}`)
   } 
   const trail = useTrail(1,{
      config: { mass: 0.5, tension: 2000, friction: 300 },
      opacity: filter ? 1 : 0,
      y: filter ? 0 : -100,
      height: filter ? 400 : 0,
      from: { opacity: 0, y: 0, height: 0 },
    })
   return(
      <>
         <div className={style.NavBar}>
         <NavLinks filter = {filter} setFilter = {setFilter} SubmitForm={SubmitForm} value={value} setValue={setValue}/></div>
         <MobileNavBAr filter = {filter} setFilter = {setFilter} SubmitForm={SubmitForm} value={value} setValue={setValue}/>
      {filter ? 
            <div>         
      {trail.map((props , index) => (
         <animated.div key = {index} style={{...props}}>
            <div className={style.filter}>
               <div className="container">
                  <div className="row">
            <div className={style.search__input + ' ' + "d-flex" + ' ' + "align-items-center" + ' ' + "justify-content-between"}>
         <div className={style.nouslider}>
            
          <Nouislider range={{min: 0, max: 10}}
                start={[0, 10]}
                step={1}
                tooltips
                connect
                onChange={SearchRating}
                className={style.slider}
                />
            <h2>Rating</h2>
          <Nouislider range={{min: 1950, max: 2022}}
                start={[1950, 2022]}
                step={1}
                tooltips
                connect
                onChange={SearchYear}
                className={style.slider}/>
               <h2>Year</h2>
          </div>
          <div className={"d-flex flex-column"}>
             <h4>Genre:</h4>
             <select className={style.filter__select} id= "select" onChange={SearchGenre}>
                {genres.map(item => {
                   return <option value={item.id}>{item.genre}</option>
                })}
             </select>
             <h4>Sort:</h4>
             <select className={style.filter__select} onChange={SearchSort}>
                <option value="RATING">Rating</option>
                <option value="YEAR">Year</option>
             </select>
          </div>
          <div>
             <button className={style.button__find} onClick={(e) => SubmitFilter() || setFilter(false)}>Find</button>
          </div>
            </div>
            </div>
         </div>
         </div>
         </animated.div>)
      )}
      
      </div> : null}
      </>
   )
}

export default Headers;
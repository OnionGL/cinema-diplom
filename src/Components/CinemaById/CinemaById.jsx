import React , {useEffect} from 'react'
import style from './CinemaById.module.css'
import { getFilmByIdSelector , getURL , getFrames} from '../../redux/cinemaById-selector';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setFilmById, setVideoFilm , setFrames} from '../../redux/CinemaById-reducer'
import Carousel from 'react-material-ui-carousel'
import { useAuthState } from 'react-firebase-hooks/auth';
import { authentication } from '../../API/Firebase';


const CinemaById = () => {
   const [user] = useAuthState(authentication)
   const film = useSelector(getFilmByIdSelector)
   const url = useSelector(getURL)
   const frames = useSelector(getFrames)
   const dispatch = useDispatch()
   const { id } = useParams()
   useEffect(() => {
      dispatch(setFilmById(id))
      dispatch(setVideoFilm(id))
      dispatch(setFrames(id))
   },[])
   return <>
      <div className={style.cinemaID}>
         <div className="container">
            <div className="row">
               <div className = {style.cinemabyid__img + ' ' + "col-md-5"}>
                  <img src={film.posterUrlPreview}/>
               </div>
               <div className={style.cinemabyid__text + ' ' + "col-md-7 d-flex flex-column"}>
                  <div>{film.nameRu}</div>
                  <div style={{marginBottom: 10}}>
                     Рейтинг IMDB: {film.ratingImdb}
                  </div>
                  <div style={{marginBottom: 10}}>
                     Год выпуска: {film.year}
                  </div>
                  <div style={{display: 'flex', fontSize: 22 , marginBottom: 10}}>
                     <div style={{fontSize: 22 , marginRight: 10}}>Жанр:</div> <div style={{display: 'flex' , fontSize: 22 , marginRight: 5}}>{film.genres && film.genres.map((i , index) => `${i.genre}` + ((index + 1) !== film.genres.length ? ', ' : ''))}</div>
                  </div>
                  <div style={{display: 'flex', fontSize: 22 , marginBottom: 10}}>
                     <div style={{fontSize: 22 , marginRight: 10}}>Страна производства:</div> <div style={{display: 'flex' , fontSize: 22 , marginRight: 5}}>{film.countries && film.countries.map((i , index) => `${i.country}` + ((index + 1) !== film.countries.length ? ', ' : ''))}</div>
                  </div>
                  {user && <button style={{border: '2px solid white' , background: 'none' , color: 'white' , fontWeight: 'bold' , margin: '30px 0'}}>
                     Добавить в избранное
                  </button>}
                 {film.shortDescription  ? <div>{`"` + film.shortDescription + `"`}</div> : <div></div>}
                  <div>{film.description}</div>
               </div>
               <div className={style.cinemaID__carousel}>
                  <Carousel 
                     activeIndicatorIconButtonProps={{
                         style: {
                            display: 'none',
                         }
                     }}
                     navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                        style: {
                            opacity: 1
                        }
                    }} 
                     indicatorContainerProps={{
                         style: {
                             display: 'none',
                             marginTop: '50px', // 5
                             textAlign: 'right' // 4
                         }
                 
                     }}
                  >
                  {frames.map(item => {
                     return (
                         <img className={style.carousel__img}src={item.preview}/>)
                  })}
                  </Carousel>
                  </div>
            </div>
         </div>
      </div>
      
   </>
}


export default CinemaById;
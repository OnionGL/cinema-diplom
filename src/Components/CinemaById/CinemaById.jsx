import React , {useEffect} from 'react'
import style from './CinemaById.module.css'
import { getFilmByIdSelector , getURL , getFrames} from '../../redux/cinemaById-selector';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setFilmById, setVideoFilm , setFrames} from '../../redux/CinemaById-reducer'
import Carousel from 'react-material-ui-carousel'


const CinemaById = () => {
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
                  <button style={{border: '2px solid white', margin: '20px 0' , background: 'none' , color: 'white' , fontWeight: 'bold'}}>
                     Добавить в избранное
                  </button>
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
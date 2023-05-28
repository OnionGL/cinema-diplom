import { CinemaAPI, FilmVideoAPI } from '../API/KinopoiskAPI';
const GET_FILM = "GET_FILM"
const GET_ID = "GET_ID"
const SET_URL = "SET_URL"
const GET_FRAMES = "GET_FRAMES"
const TOGGLE_IS_FETCHING= "TOGGLE_IS_FETCHING"

const initialState = {
   film : { },
   url : {},
   frames: [],
   Id : 0,
   isFetchingId : true
}

const CinemaByIdReducer = (state = initialState, action) => {
   switch(action.type){
      case GET_FILM : 
      return{
         ...state,
         film : action.film
      }
      case GET_ID : 
      return {
         ...state,
         Id : action.Id
      }
      case TOGGLE_IS_FETCHING:
         return {
            ...state,
            isFetchingId : action.isFetchingId
      }
      case SET_URL : 
      return {
         ...state,
         url : action.url
      }
      case GET_FRAMES :
         return {
            ...state,
            frames : action.frames
         }
      
      default :
         return state;
   }
}
export const getFilmById = (film) => ({type : GET_FILM , film})
export const getFilmId = (Id) => ({type : GET_ID, Id})
export const ToggleIsFetching = (isFetchingId) => ({type : TOGGLE_IS_FETCHING, isFetchingId})
export const setURL = (url) => ({type : SET_URL, url})
export const getFrames = (frames) => ({type : GET_FRAMES, frames})
export const setFilmById = (Id) => {
   return (dispatch) => {
      ToggleIsFetching(true)
      CinemaAPI.getCinemaById(Id).then(response => {
         console.log(response)
         if(response){
            dispatch(getFilmById(response.data))
         }
      })
      ToggleIsFetching(false)
   }
}
export const setVideoFilm = (id) => {
   return (dispatch) => {
      FilmVideoAPI.getTrailer(id).then(response => {
            response.data.items.map(item => {
            if(item.site === "KINOPOISK_WIDGET" && item.name === "Тизер"){
               dispatch(setURL(item))
            }
         })
      })
   }
}
export const setFrames = (id) => {
   return (dispatch) => {
      CinemaAPI.getFrames(id).then(response => {
         dispatch(getFrames(response.data.frames))
      })
   }
}
export default CinemaByIdReducer;
import { SearchCinemaByFilter } from '../API/KinopoiskAPI';
const GET_CINEMA_BYSEARCH = "GET_CINEMA_BYSEARCH"
const SET_TOTAL_PAGE_BYSEARCH = "SET_TOTAL_PAGE_BYSEARCH"
const TOGGLE_IS_FETCHING_BYSEARCH= "TOGGLE_IS_FETCHING_BYSEARCH"
const GET_GENRES= "GET_GENRES"


const initialState = {
   cinemaBySearch : [  ],
   totalPageBySearch : 0,
   genres : [],
   isFetchingBySearch : true

}

const CinemaReducerByFilter = (state = initialState, action) => {
   switch(action.type){
      case GET_CINEMA_BYSEARCH: 
         return {
            ...state,
            cinemaBySearch : action.cinemaBySearch
         }
      case SET_TOTAL_PAGE_BYSEARCH:
         return{
            ...state,
            totalPageBySearch : action.totalPageBySearch
         }
      case TOGGLE_IS_FETCHING_BYSEARCH:
         return {
            ...state,
            isFetchingBySearch : action.isFetchingBySearch
         }
      case GET_GENRES:
         return {
            ...state,
            genres : action.genres
         }
      default :
         return state;
   }
}
export const getCinemaBySearch = (cinemaBySearch) => ({type: GET_CINEMA_BYSEARCH, cinemaBySearch})
export const setTotalPageBySearch = (totalPageBySearch) => ({type: SET_TOTAL_PAGE_BYSEARCH, totalPageBySearch})
export const setToggleIsFetchingBySearch = (isFetchingBySearch) => ({type : TOGGLE_IS_FETCHING_BYSEARCH, isFetchingBySearch})
export const getGenres = (genres) => ({type : GET_GENRES, genres})
export const getCinemaByFilter = (ratingFrom , ratingTo , yearFrom , yearTo , page ,genre ,order) => {
      return (dispatch) => {
         dispatch(setToggleIsFetchingBySearch(true))
       SearchCinemaByFilter.Filter(ratingFrom , ratingTo , yearFrom , yearTo , page , genre , order).then(response => {
            dispatch(getCinemaBySearch(response.data.films))
            dispatch(setTotalPageBySearch(response.data.pagesCount))
            setTimeout(() => {
               dispatch(setToggleIsFetchingBySearch(false))
            } , 2000)
            
       })
   }
}
export const setGenres = () => {
   return (dispatch) => {
      dispatch(setToggleIsFetchingBySearch(true))
      SearchCinemaByFilter.getGenres().then(response => {
         dispatch(getGenres(response.data.genres))
         setTimeout(() => {
            dispatch(setToggleIsFetchingBySearch(false))
         } , 2000)
      })
   }
}

export default CinemaReducerByFilter;
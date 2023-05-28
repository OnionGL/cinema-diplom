import { CinemaAPI } from '../API/KinopoiskAPI';
const GET_CINEMA = "GET_CINEMA"
const SET_TOTAL_PAGE = "SET_TOTAL_PAGE"
const TOGGLE_IS_FETCHING= "TOGGLE_ISFATCHING"


const initialState = {
   cinema : [  ],
   totalPage : 0,
   isFetching : true

}

const CinemaReducer = (state = initialState, action) => {
   switch(action.type){
      case GET_CINEMA: 
         return {
            ...state,
            cinema : action.cinema
         }
      case SET_TOTAL_PAGE:
         return{
            ...state,
            totalPage : action.totalPage
         }
      case TOGGLE_IS_FETCHING:
         return {
            ...state,
            isFetching : action.isFetching
         }
      default :
         return state;
   }
}
export const getCinema = (cinema) => ({type: GET_CINEMA, cinema})
export const setTotalPage = (totalPage) => ({type: SET_TOTAL_PAGE, totalPage})
export const setToggleIsFetching = (isFetching) => ({type : TOGGLE_IS_FETCHING, isFetching})
export const getCinemaAPI = (page) => {
   return (dispatch) => {
      dispatch(setToggleIsFetching(true))
       CinemaAPI.getCinema(page).then(response => {
            dispatch(getCinema(response.data.films))
            dispatch(setTotalPage(response.data.pagesCount))
            setTimeout(() => {
               dispatch(setToggleIsFetching(false))
            } , 2000)
            
       })
   }
}

export default CinemaReducer;
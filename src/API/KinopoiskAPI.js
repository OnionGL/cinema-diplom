import * as axios from "axios";
const API_KEY = "f972e94e-01cb-48d6-8b62-5f274026e078"

const instance = axios.create({
   baseURL: 'https://kinopoiskapiunofficial.tech/api/',
   headers : {
      "Content-Type" : "application/json",
      "X-API-KEY" : API_KEY
   }
})


export const CinemaAPI = {
   getCinema (page){
      return instance.get(`v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`)
   },
   getCinemaById (Id){
      return instance.get(`v2.2/films/${Id}`)
   },
   searchCinema (keyword ,page) {
      return instance.get(`v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`)
   },
   getFrames (id) {
      return instance.get(`v2.1/films/${id}/frames`)
   }
}
export const FilmVideoAPI = {
   getTrailer (id) {
      return instance.get(`v2.2/films/${id}/videos`)
   }
}
export const SearchCinemaByFilter = {
   Filter (ratingfrom , ratingto , yearfrom , yearto , page , genre , order){
      return instance.get(`v2.1/films/search-by-filters?genre=${genre}&order=${order}&type=ALL&ratingFrom=${ratingfrom}&ratingTo=${ratingto}&yearFrom=${yearfrom}&yearTo=${yearto}&page=${page}`)
   },
   getGenres (){
      return instance.get(`v2.1/films/filters`)
   }
   
}


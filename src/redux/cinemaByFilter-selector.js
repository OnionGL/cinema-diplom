
export const getCinemaBySearchSelector = (state) => {
   return state.SearchCinemaByFilter.cinemaBySearch
}
export const getGenresSelector = (state) => {
   return state.SearchCinemaByFilter.genres
}

export const getTotalPageBySearchSelector = (state) => {
   return state.SearchCinemaByFilter.totalPageBySearch
}
export const getIsFetchingBySearchSelector = (state) => {
   return state.SearchCinemaByFilter.isFetchingBySearch
}

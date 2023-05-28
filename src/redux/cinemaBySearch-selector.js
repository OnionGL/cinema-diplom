

export const getCinemaSearchSelector = (state) => {
   return state.SearchCinema.cinema
}

export const getTotalPageSearchSelector = (state) => {
   return state.SearchCinema.totalPage
}
export const getIsFetchingSearchSelector = (state) => {
   return state.SearchCinema.isFetching
}

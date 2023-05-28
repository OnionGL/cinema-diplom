import { createSelector } from "reselect"

const getCinemaSelector = (state) => {
   return state.Cinema.cinema
}
export const getCinemaSelectorSuper = createSelector(getCinemaSelector , cinema =>{
   return cinema
})
export const getTotalPageSelector = (state) => {
   return state.Cinema.totalPage
}
export const getIsFetchingSelector = (state) => {
   return state.Cinema.isFetching
}

import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import CinemaReducer from './cinema-reducer';
import CinemaByIdReducer from './CinemaById-reducer';
import CinemaReducerByFilter from "./searchByFilter-reducer";
import FilmByKeyword from './searchByKeyword-reducer'
import LoginReducer from './login-reducer';

let redusers = combineReducers({
    Cinema : CinemaReducer,
    FilmId : CinemaByIdReducer,
    SearchCinema : FilmByKeyword,
    SearchCinemaByFilter : CinemaReducerByFilter,
    login: LoginReducer
});


let store = createStore(redusers, applyMiddleware(thunkMiddleware));

export default store;
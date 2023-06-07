


const initialState = {
   isAuthenticated: false,
   userId: null,
}

const LoginReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          userId: action.payload.userId,
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          userId: null,
        };
      default:
        return state;
    }
}

export default LoginReducer;
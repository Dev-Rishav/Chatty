import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT
} from '../actions/authActionTypes';

const initialState = {
    isAuthenticated: localStorage.getItem('authToken') ? true : false,
    userDTO: localStorage.getItem('userDTO') ? JSON.parse(localStorage.getItem('userDTO')) : null,
    token: localStorage.getItem('authToken') || null,
    loading: false,
    error: null,
    signupSuccess: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                signupSuccess: false
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                userDTO: action.payload.userDTO,
                token: action.payload.token,
                loading: false,
                error: null
            };
            
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: null,
                signupSuccess: true 
            };

        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                userDTO: null,
                token: null,
                loading: false,
                error: action.payload,
                signupSuccess: false
            };

        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                userDTO: null,
                token: null,
                error: null
            };

        default:
            return state;
    }
};

export default authReducer;
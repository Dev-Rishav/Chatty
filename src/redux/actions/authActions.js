import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './authActionTypes';
import axios from 'axios';
import toast from 'react-hot-toast';


export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post('http://localhost:8080/login', credentials);
        const { userDTO, token } = response.data;
        toast.success(`Welcome back, ${userDTO.username}!`);
        console.log("res= ",response.data);
        
        

        localStorage.setItem('authToken', token);
        localStorage.setItem('userDTO', JSON.stringify(userDTO));

        dispatch({
            type: LOGIN_SUCCESS,
            payload: { userDTO, token }
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data?.message || 'Login failed'
        });
        toast.error("Invalid Credentials / Account does not exist");
        throw error;
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    dispatch({ type: LOGOUT });
};
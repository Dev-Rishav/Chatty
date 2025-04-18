import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
} from './authActionTypes';
import { AppDispatch } from '../store';

interface Credentials {
  email: string;
  password: string;
}

interface UserDTO {
  username: string;
  name?: string;
  email: string;
}

interface LoginResponse {
  userDTO: UserDTO;
  token: string;
}

export const loginUser = (credentials: Credentials) => async (dispatch: AppDispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post<LoginResponse>('http://localhost:8080/login', credentials);
    const { userDTO, token } = response.data;

    toast.success(`Welcome back, ${userDTO.username}!`);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userDTO', JSON.stringify(userDTO));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { userDTO, token },
    });
  } catch (error: any) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || 'Login failed',
    });
    toast.error('Invalid Credentials / Account does not exist');
    throw error;
  }
};

export const registerUser = (credentials: Credentials) => async (dispatch: AppDispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    await axios.post('http://localhost:8080/register', credentials);

    toast.success(`Registration successful! Please login with your credentials.`);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: { message: 'Registration successful' },
    });
  } catch (error: any) {
    dispatch({
      type: SIGNUP_FAILURE,
      payload: error.response?.data?.message || 'Registration failed',
    });
    toast.error('Registration failed. Please try again.');
    throw error;
  }
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userDTO');
  dispatch({ type: LOGOUT });
};

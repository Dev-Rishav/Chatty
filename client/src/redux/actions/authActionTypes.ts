export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGOUT = 'LOGOUT';

export type AuthActionTypes =
  | typeof LOGIN_REQUEST
  | typeof LOGIN_SUCCESS
  | typeof LOGIN_FAILURE
  | typeof SIGNUP_REQUEST
  | typeof SIGNUP_SUCCESS
  | typeof SIGNUP_FAILURE
  | typeof LOGOUT;

import axios from 'axios'

export const GET_USER = 'GET_USER'
export const GET_USER_FULFILLED = 'GET_USER_FULFILLED'
export const LOGOUT = 'LOGOUT'
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED'

let initialState = {
  data: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_USER_FULFILLED:  
      return {...state, data: action.payload.data}
    case LOGOUT_FULFILLED:
      return { ...state, data: null}
    default:
      return state;
  }
}

export function getCurrentUser() {
  return {
    type: GET_USER,
    payload: axios.get(`/auth/currentUser`)
  }
}
export function logout() {
  return {
    type: LOGOUT,
    payload: axios.get(`/auth/logout`)
  }
}
import axios from 'axios'

const GET_WEATHER_INFO = 'GET_WEATHER_INFO'
const GET_WEATHER_INFO_FULFILLED = 'GET_WEATHER_INFO_FULFILLED'

let initialState = {
  data: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER_INFO_FULFILLED:
      return { ...state, data: action.payload.data }
    default:
      return state;
  }
}

export function getWeatherInfo(lat, lng) {
  return {
    type: GET_WEATHER_INFO,
    payload: axios.get(`https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_KEY}/${lat},${lng}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
  }
}
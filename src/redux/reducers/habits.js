const GET_HABITS_COMPLETED_TODAY = 'GET_HABITS_COMPLETED_TODAY'

let initialState = {
  completed: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_HABITS_COMPLETED_TODAY:
      return { ...state, completed: action.payload }
    default:
      return state
  }
}

export function updateHabitsCompletedToday(arr) {
  return {
    type: GET_HABITS_COMPLETED_TODAY,
    payload: arr
  }
}
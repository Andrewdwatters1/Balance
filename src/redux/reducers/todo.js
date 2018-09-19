import axios from 'axios'


const GET_TODO = 'GET_TODO'
const GET_TODO_FULFILLED = 'GET_TODO_FULFILLED'

const CREATE_TODO = 'CREATE_TODO'
const CREATE_TODO_FULFILLED = 'CREATE_TODO_FULFILLED'

const EDIT_TODO = 'EDIT_TODO'
const EDIT_TODO_FULFILLED = 'EDIT_TODO_FULFILLED'

const DELETE_TODO = 'DELETE_TODO'
const DELETE_TODO_FULFILLED = 'DELETE_TODO_FULFILLED'

let initialState = {
    todos : [],
    input: ''
}

export default function todo(state = initialState, action){
    switch(action.type){
        case GET_TODO_FULFILLED:
            return{...state, todos:action.payload.data}
        case CREATE_TODO_FULFILLED:
            return{...state, todos:action.payload.data}
        case EDIT_TODO_FULFILLED:
            return{...state, todos:action.payload.data}
        case DELETE_TODO_FULFILLED:
            return{...state, todos:action.payload.data}
        default:
            return state
    }
}

export function getTodos(){
    return{
        type: GET_TODO,
        payload: axios.get('/api/todo')
    }
}

export function deleteTodos(id){
    return{
        type: DELETE_TODO,
        payload: axios.delete(`/api/todo/${id}`)
    }
}

export function editTodos(id,content){
    return{
        type: EDIT_TODO,
        payload: axios.put(`/api/todo/${id}`, {content})
    }
}

export function createTodos(userid,content){
    return{
        type: CREATE_TODO,
        payload: axios.post('/api/todo', {userid,content})
    }
}


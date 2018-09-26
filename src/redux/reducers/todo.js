import axios from 'axios'


const GET_TODO = 'GET_TODO'
const GET_TODO_FULFILLED = 'GET_TODO_FULFILLED'

const CREATE_TODO = 'CREATE_TODO'
const CREATE_TODO_FULFILLED = 'CREATE_TODO_FULFILLED'

const EDIT_TODO = 'EDIT_TODO'
const EDIT_TODO_FULFILLED = 'EDIT_TODO_FULFILLED'

const DELETE_TODO = 'DELETE_TODO'
const DELETE_TODO_FULFILLED = 'DELETE_TODO_FULFILLED'

const MARK_COMPLETE = 'MARK_COMPLETE'
const MARK_COMPLETE_FULFILLED = 'MARK_COMPLETE_FULFILLED'

const MARK_INCOMPLETE = 'MARK_INCOMPLETE'
const MARK_INCOMPLETE_FULFILLED = 'MARK_INCOMPLETE_FULFILLED'


const TOGGLE_EDIT = 'TOGGLE_EDIT'




let initialState = {
    todos : [],
    input: '',
    completed: [],
    editFlag: false,
    editInput: ''
}

export default function reducer(state = initialState, action){    
    switch(action.type){
        case GET_TODO_FULFILLED:
            return{...state, todos:action.payload.data}
        case CREATE_TODO_FULFILLED:
            return{...state, todos:action.payload.data}
        case EDIT_TODO_FULFILLED:
        console.log(1111111111111, action.payload)
            return{...state, todos:action.payload.data}
        case DELETE_TODO_FULFILLED:
            return{...state, todos:action.payload.data}
        case MARK_COMPLETE_FULFILLED:
            return{...state, todos:action.payload.data}
        case MARK_INCOMPLETE_FULFILLED:
            return{...state, todos:action.payload.data}
        case TOGGLE_EDIT:
            return{...state, editFlag:action.payload}
        default:
            return state
    }
}

export function getTodos(userid){
    return{
        type: GET_TODO,
        payload: axios.get(`/api/todo/${userid}`)
    }
}

export function deleteTodos(id, userid){
    return{
        type: DELETE_TODO,
        payload: axios.delete(`/api/todo/${id}/${userid}`)
    }
}

export function editTodos(content,id,userid){
    return{
        type: EDIT_TODO,
        payload: axios.put(`/api/todo/${id}/${userid}`, {content})
    }
}

export function createTodos(userid,content){
    return{
        type: CREATE_TODO,
        payload: axios.post('/api/todo', {userid, content})
    }
}

export function markComplete(id, userid){
    return{
        type: MARK_COMPLETE,
        payload: axios.put(`/api/todo/complete/${id}/${userid}`)
    }
}

export function markIncomplete(id, userid){
    return{
        type: MARK_INCOMPLETE,
        payload: axios.put(`/api/todo/incomplete/${id}/${userid}`)
    }
}

export function toggleEdit(something){
    return{
        type: TOGGLE_EDIT,
        payload: something
    }
}
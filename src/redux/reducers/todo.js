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

//NESTED BELOW

const GET_NESTED = 'GET_NESTED'
const GET_NESTED_FULFILLED = 'GET_NESTED_FULFILLED'

const CREATE_NESTED = 'CREATE_NESTED'
const CREATE_NESTED_FULFILLED = 'CREATE_NESTED_FULFILLED'

const DELETE_NESTED = 'DELETE_NESTED'
const DELETE_NESTED_FULFILLED = 'DELETE_NESTED_FULFILLED'

const EDIT_NESTED = 'EDIT_NESTED'
const EDIT_NESTED_FULFILLED = 'EDIT_NESTED_FULFILLED'

const COMPLETE_NESTED = 'COMPLETE_NESTED'
const COMPLETE_NESTED_FULFILLED = 'COMPLETE_NESTED_FULFILLED'

const INCOMPLETE_NESTED = 'INCOMPLETE_NESTED'
const INCOMPLETE_NESTED_FULFILLED = 'INCOMPLETE_NESTED_FULFILLED'

const NESTED_TOGGLE_EDIT = 'NESTED_TOGGLE_EDIT'




let initialState = {
    //Regular
    todos : [],
    input: '',
    editFlag: false,
    editInput: '',
    //Nested
    nested: [],
    nestedInput: '',
    nestedFlag: false,
    nestedEdit: ''
}

export default function reducer(state = initialState, action){    
    switch(action.type){
        case GET_TODO_FULFILLED:
            return{...state, todos:action.payload.data}
        case CREATE_TODO_FULFILLED:
            return{...state, todos:action.payload.data}
        case EDIT_TODO_FULFILLED:
            return{...state, todos:action.payload.data}
        case DELETE_TODO_FULFILLED:
            return{...state, todos:action.payload.data}
        case MARK_COMPLETE_FULFILLED:
            return{...state, todos:action.payload.data}
        case MARK_INCOMPLETE_FULFILLED:
            return{...state, todos:action.payload.data}
        case TOGGLE_EDIT:
            return{...state, editFlag:action.payload}
        case CREATE_NESTED_FULFILLED:
            return{...state, nested:action.payload.data}
        case DELETE_NESTED_FULFILLED:
            return{...state, nested:action.payload.data}
        case EDIT_NESTED_FULFILLED:
            return{...state, nested:action.payload.data}
        case COMPLETE_NESTED_FULFILLED:
            return{...state, nested:action.payload.data}
        case INCOMPLETE_NESTED_FULFILLED:
            return{...state, nested:action.payload.data}
        case NESTED_TOGGLE_EDIT:
            return{...state, nestedFlag:action.payload}
        case GET_NESTED_FULFILLED:
            return{...state, nested:action.payload.data}
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

//NESTED

export function getNested(parenttodoid){
    return{
        type: GET_NESTED,
        payload: axios.get(`/api/todo/nested/${parenttodoid}`)
    }
}
export function createNested(parenttodoid, userid, content){
    return{
        type: CREATE_NESTED,
        payload: axios.post(`/api/todo/nested`, {parenttodoid, userid, content})
    }
}
export function deleteNested(id,parenttodoid){
    return{
        type: GET_NESTED,
        payload: axios.delete(`/api/todo/nested/${id}/${parenttodoid}`)
    }
}
export function editNested(content,id,parenttodoid){
    return{
        type: EDIT_NESTED,
        payload: axios.put(`/api/todo/nested/${id}/${parenttodoid}`, {content})
    }
}
export function completeNested(id,parenttodoid){
    return{
        type: COMPLETE_NESTED,
        payload: axios.put(`/api/todo/nested/complete/${id}/${parenttodoid}`)
    }
}
export function incompleteNested(id,parenttodoid){
    return{
        type: INCOMPLETE_NESTED,
        payload: axios.put(`/api/todo/nested/incomplete/${id}/${parenttodoid}`)
    }
}
export function nestedToggleEdit(x){
    return{
        type: NESTED_TOGGLE_EDIT,
        payload: x
    }
}

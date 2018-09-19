import axios from 'axios'

let initaialState = {
    notePad: [],
    scrachPad: []
}
const FULFILLED = "_FULFILLED"
const GET_NOTES = 'GET_NOTES';
const ADD_NOTES = 'ADD_NOTES';
const DELETE_NOTES = 'DELETE_NOTES';
const PUT_NOTES = 'PUT_NOTES'
const GET_SCRACHPAD = 'GET_SCRACHPAD';
const ADD_SCRACHPAD = 'ADD_SCRACHPAD';
const DELETE_SCRACHPAD = 'DELETE_SCRACHPAD';
const PUT_SCRACHPAD = 'PUT_SCRACHPAD';


export function getNotes(){
    let notePad = axios.get('/api/notepad').then(results => {
        console.log(results)
        return results.data
    })
    return{
        type: GET_NOTES,
        payload: notePad
    }
}

export function addNotes(note){
    let notePad = axios.post('/api/notepad', note).then(results => {
        return results.data
    })
    return{
        type: ADD_NOTES,
        payload: notePad
    }
}

export function deleteNotes(id){
    let notePad = axios.delete(`/api/notepad/${id}`).then(results =>{
         return results.data
       })
       return {
           type: DELETE_NOTES,
           payload: notePad
       }
     }




     export default function reducer(state = initaialState, action) {
        switch(action.type){
            case GET_NOTES + FULFILLED:
            return Object.assign({}, state, {notePad: action.payload})
            case DELETE_NOTES + FULFILLED:
            return Object.assign({}, state, {notePad: action.payload})
            case ADD_NOTES + FULFILLED:
            return Object.assign({}, state, {notePad: action.payload})
            case GET_NOTES + FULFILLED:
            return Object.assign({}, state, {notepPad: action.payload})
        
            // case DELETE_ALL_FROM_SCRATCHPAD:
            // return Object.assign({}, state, {cart: []})
            default: 
            return state;
        }
    }
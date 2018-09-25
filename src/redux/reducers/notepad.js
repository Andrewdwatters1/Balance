import axios from 'axios'
// import { func } from '../../../node_modules/@types/prop-types';

let initaialState = {
    notePad: [],
    scratchPad: []
}
const FULFILLED = "_FULFILLED"
const GET_NOTES = 'GET_NOTES';
const ADD_NOTES = 'ADD_NOTES';
const DELETE_NOTES = 'DELETE_NOTES';
const PUT_NOTES = 'PUT_NOTES'
const GET_SCRATCHPAD = 'GET_SCRATCHPAD';
const ADD_SCRATCHPAD = 'ADD_SCRATCHPAD';
const DELETE_SCRATCHPAD = 'DELETE_SCRATCHPAD';
const PUT_SCRATCHPAD = 'PUT_SCRATCHPAD';


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

export function getScratchPad(){
    let scratchPad = axios.get('/api/scratchpad').then(results => {
        console.log(results)
        return results.data
    })
    return{
        type: GET_SCRATCHPAD,
        payload: scratchPad
    }
}

export function addScratchPad(note){
    let scratchPad = axios.post('/api/scratchpad', note).then(results => {
        return results.data
    })
    return{
        type: ADD_SCRATCHPAD,
        payload: scratchPad
    }
}

export function deleteScratchPad(id){
    let scratchPad = axios.delete(`/api/scratchpad/${id}`).then(results =>{
         return results.data
       })
       return {
           type: DELETE_SCRATCHPAD,
           payload: scratchPad
       }
     }
// export function editScratchPad(id){
    
//     let scratchPad = axios.put(`/api/scratchpad/${id}`).then(results => {
//         return results.data
//     })
//     return {
//         type: PUT_SCRATCHPAD,
//         payload: scratchPad
//     }
// }     




     export default function reducer(state = initaialState, action) {
        switch(action.type){
            case GET_NOTES + FULFILLED:
            return Object.assign({}, state, {notePad: action.payload})
            case DELETE_NOTES + FULFILLED:
            return Object.assign({}, state, {notePad: action.payload})
            case ADD_NOTES + FULFILLED:
            return Object.assign({}, state, {notePad: action.payload})
            case GET_SCRATCHPAD + FULFILLED:
            return Object.assign({}, state, {scratchPad: action.payload})
            case DELETE_SCRATCHPAD + FULFILLED:
            return Object.assign({}, state, {scratchPad: action.payload})
            case ADD_SCRATCHPAD + FULFILLED:
            return Object.assign({}, state, {scratchPad: action.payload})
            case PUT_SCRATCHPAD + FULFILLED:
            return Object.assign({}, state, {scratchPad: action.payload})
            // case DELETE_ALL_FROM_SCRATCHPAD:
            // return Object.assign({}, state, {cart: []})
            default: 
            return state;
        }
    }
import { combineReducers } from 'redux'
import calendar from './calendar'
import habits from './habits'
import notepad from './notepad'
import todo from './todo'
import user from './user'


export default combineReducers({ calendar, habits, notepad, todo, user })
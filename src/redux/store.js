import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

import reducer from './reducers/index.js'

export default createStore(reducer, applyMiddleware(promiseMiddleware()));
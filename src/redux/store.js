import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

import reducer from './reducers'

export default createStore(reducer, applyMiddleware(promiseMiddleware()));
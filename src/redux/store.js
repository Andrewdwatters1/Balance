import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

import index from './reducers/index'

export default createStore(index, applyMiddleware(promiseMiddleware()));
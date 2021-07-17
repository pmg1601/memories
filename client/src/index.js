/**
 * Main index file. Handles redux-store. Integrates App component.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import { reducers } from './reducers'
import App from './App'
import './index.css'

/**
 * "THUNK"
 * Middleware applied to store
 * Allows action to return function instead of object
 * Can dispatch actions handled by reducers
 */

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { issuesReducer } from './reducers/issues-reducer'

const rootReducer = combineReducers({
  issuesData: issuesReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

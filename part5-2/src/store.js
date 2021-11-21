import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import blogReducer from './reducer/blogReducer'
import loggedUserReducer from './reducer/loggedUserReducer'
import usersReducer from './reducer/usersReducer'
import notificationReducer from './reducer/notificationReducer'
const reducers=combineReducers({
blogs:blogReducer,
loggedUser:loggedUserReducer,
users:usersReducer,
notification:notificationReducer
})

const store=createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))

export default store
import { combineReducers } from 'redux'
import UserReducer from './user'
import AdminReducer from './admin'

const rootReducer = combineReducers({
	user: UserReducer,
	admin: AdminReducer
});

export default rootReducer

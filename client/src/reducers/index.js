import { combineReducers } from 'redux'
import users from './users'
import login from './login'
import currentUser from './currentUser'
import signup from './signup'
import comments from './comments'

export default combineReducers ( {
  
  users,
  login,
  currentUser,
  signup,
  comments,
})

import {combineReducers} from 'redux'

import registerReducer from './register/registerReducer'
import loginReducer from './login/loginReducer'
import userReducer from './user/userReducer'
import createPostReducer from './create post/createPostReducer'
import adminReducer from './admin/adminReducer'

const rootReducer = combineReducers({
    register: registerReducer,
    login:loginReducer,
    userProfile:userReducer,
    createPost:createPostReducer,
    admin:adminReducer,
})

export default rootReducer
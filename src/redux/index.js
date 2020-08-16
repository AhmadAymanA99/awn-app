// File used to dispatch all action creators. 

export { register } from "./register/registerActions"
export { login, changePassword, logout} from './login/loginActions'
export { getUserPosts , getUserData, confirmEmail, rateUser, deleteAccount, editPost} from './user/userActions'
export { createPost }from './create post/createPostActions'
export { removePost , removeReport , removeUser , adminLogin, adminGetReportItems} from './admin/adminActions'
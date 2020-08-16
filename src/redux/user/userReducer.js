import {GET_USER_INFO_FAILURE,GET_POSTS_SUCCESS, GET_USER_INFO_SUCCESS,EDIT_POST_SUCCESS} from "./userTypes"
import { getUserInfoSuccess } from "./userActions"

const initState = {
    reviews:[],
    userName:"",
    name:"",
    phoneNumber:"",
    rate:"",
    email:"",
    loadingPosts:"false",
    // posts:[],
}
const userReducer = (state = initState, action) => {
    switch(action.type){

        case GET_POSTS_SUCCESS: {
            // API CALL nateg 2l posts h7oto f 2l posts fo2 w 23mlaha return
            // WILL BE FIXED.
            return {
                ...state,
                posts:action.userPosts,
                loadingPosts:"true"
                //posts:action.userPosts,
            }
        }
        case GET_USER_INFO_SUCCESS: {
            return{
                ...state,
                userName:action.userInfo.userName,
                name:action.userInfo.name,
                rate:action.userInfo.rate,
                email:action.userInfo.email,
                phoneNumber:action.userInfo.phoneNumber
            }
        }
        case GET_USER_INFO_FAILURE:{
            return {
                ...state,
                userName:"NOT FOUND"
            }
        }
        case EDIT_POST_SUCCESS:{
            return {
                ...state,
                status:action.status
            }
        }
        default:{
            return state;
        }
    }
}

export default userReducer;
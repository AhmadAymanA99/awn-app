import {BAN_USER,REMOVE_POST,REMOVE_REPORT,ADMIN_LOG_IN_FAILURE,ADMIN_LOG_IN,ADMIN_GET_ITEMS,ADMIN_LOG_IN_SUCCESS,ADMIN_GET_REPORT_ITEMS_SUCCESS} from "./adminTypes"

const initState = {
    reports:[],
    status:"",
    posts:["Post1","Post2","Post3"],
    adminName:"",
    token:""
}

const adminReducer = (state = initState, action) => { 
    switch(action.type){
        case BAN_USER: {
            return {
                ...state,// We need to copy some values from current state. 
            }
        }
        case REMOVE_POST:{
            return {
                ...state,
            }
        }
        case REMOVE_REPORT:{
            return{
                ...state,
            }
        }
        
        case ADMIN_LOG_IN: {
            return {...state}
        }

        
        case ADMIN_LOG_IN_SUCCESS: {
            return {
                ...state,
                adminName:action.adminName,
                status:action.status,
                token:action.token,
            }
        }


        case ADMIN_LOG_IN_FAILURE: {
            return {
                ...state,
                status:action.status,
            }
        }

        //USELESS
        case ADMIN_GET_ITEMS:{
            // API CALL TO SET THE POSTS 
            return {
                ...state,
            }
        }

        case ADMIN_GET_REPORT_ITEMS_SUCCESS:{
            // API CALL TO SET THE POSTS 
            return {
                ...state,
                reports:action.reports
            }
        }

        default:{
            return {...state};
        }
    }
}


export default adminReducer
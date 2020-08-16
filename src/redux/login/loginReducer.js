import {LOG_IN,LOG_IN_SUCCESS,LOG_IN_FAILURE,CHANGE_PASSWORD, LOG_OUT} from "./loginTypes"

const initState = {
    userName:"",
    name:"",
    phoneNumber:"",
    rate:"",
    email:"",
    status:"",
    token:"" 
}

const loginReducer = (state = initState, action) => {

    
    // allocating the action values to the state. 
    switch(action.type){
        case LOG_IN: {
            return {
                ...state,// Incase we need to copy some values from current state. 
            }
        }
        case LOG_IN_SUCCESS:{
            return {
                ...state,
                userName:action.userName,
                email:action.email,
                phoneNumber:action.phoneNumber,
                rate:action.rate,
                name:action.name,
                status:action.status,
                token:action.token,
            }
        }
        case LOG_IN_FAILURE:{
            return {
                ...state,
                status:action.status
            }
        }

        case CHANGE_PASSWORD:{
            return{
                ...state
            }
        }

        case LOG_OUT:{
            return{
                ...state,
                userName:"",
                name:"",
                phoneNumber:"",
                rate:"",
                email:"",
                status:"",
                token:"" 
            }
        }

        default:{
            return state;
        }
    }
}


export default loginReducer
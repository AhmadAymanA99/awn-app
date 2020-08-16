import {REGISTER,REGISTER_SUCCESS} from "./registerTypes"
//import { register } from "./registerActions"

// Might not need this state. 
const initState = {
    status:""
}



const registerReducer = (state = initState, action) => {
    // allocating the action values to the state.

    switch(action.type){
        case REGISTER: {
            return {
                ...state,
            }
        }
        case REGISTER_SUCCESS:{
            return{
                ...state,
                status:action.status
            }
        }
        default:{
            return state;
        }
    }
}


export default registerReducer
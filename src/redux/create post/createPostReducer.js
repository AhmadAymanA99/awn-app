import { CREATE_POST } from './createPostTypes'

const initState = {
    
}

const createPostReducer = (state=initState,action) =>{
    switch(action.type){
        case CREATE_POST:{
            return{
                ...state
            }
        }


        default: {
            return {...state}
        }
    }
}
export default createPostReducer
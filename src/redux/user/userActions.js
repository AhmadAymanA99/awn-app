import { GET_REVIEWS, GET_POSTS_SUCCESS, GET_USER_INFO_FAILURE,GET_USER_INFO_SUCCESS, EDIT_POST_SUCCESS } from "./userTypes"
// import thunk from "redux-thunk"

const ip = "localhost"
var status= ""
// Getting user posts. FIX WITH ZEIYAD // FIX WITH ZEIYAD // FIX WITH ZEIYAD 
export const getUserPosts = (userName) => {
    console.log(userName)
    return (dispatch) => {
        fetch(`https://awn-backend.herokuapp.com/api/posts/username/${userName}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // Setting the data variable.
            console.log(data)
            dispatch(getUserPostsSuccess(data))
            //userPosts= data;
        })
        .catch(err => {
            console.log(err)
            return;
        })
    }
}

export const getUserPostsSuccess = (userPosts) => {
    return {
        // Setting the values we get from calling the function.
        type:GET_POSTS_SUCCESS,
        userPosts:userPosts,
    }
}

export const getUserReviews = (userName) => {
    return {
        // Setting the values we get from calling the function.
        type:GET_REVIEWS,
        userName:userName,
    }
}

// Getting user personal info.
export const getUserData = (userName)=>{
    
    var status ="";
    var url = `https://awn-backend.herokuapp.com/api/users/getUser/${userName}`

    return (dispatch) => {
        fetch(url)
        .then((response) => {
            status = response.status
            return response.json();
        })
        .then(data => {
            // Setting the data variable.
            if(status === 404){
                dispatch(getUserInfoFailure())
            }
            else{
                dispatch(getUserInfoSuccess(data))
            }
            //userPosts= data;
        })
        .catch(err => {
            console.log(err)
        })
    }

}
export const getUserInfoSuccess = (userInfo) => {
    return {
        // Setting the values we get from calling the function.
        type:GET_USER_INFO_SUCCESS,
        userInfo:userInfo,
    }
}
export const getUserInfoFailure = () => {
    return {
        // Setting the values we get from calling the function.
        type:GET_USER_INFO_FAILURE,
    }
}

export const confirmEmail = (userId,generatedToken) => {
    const opts = {
        id:userId,
        token:generatedToken
    }
    return (dispatch) => {
        fetch(`https://awn-backend.herokuapp.com/api/users/confirmEmail`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(opts) // body data type must match "Content-Type" header
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // Setting the data variable.
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
}}

export const rateUser = (token,rate,userName) => {
    const opts = {
        rate:rate,
        userName:userName
    }
    return (dispatch) => {
        fetch(`https://awn-backend.herokuapp.com/api/users/rate`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(opts) // body data type must match "Content-Type" header
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // Setting the data variable.
            console.log(data)
        }).catch(err => {
            console.log(err)
        })}
}

export const editPost = (title, description, location, tags, categoryName,subCategoryName,token, postId) => {
    const opts = {
        title:title, 
        description:description, 
        tags:tags, 
        location:location, 
        categoryName:categoryName,
        subCategory:subCategoryName
    }
    return (dispatch) => {
        fetch(`https://awn-backend.herokuapp.com/api/posts/update/${postId}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(opts) // body data type must match "Content-Type" header
        })
        .then((response) => {
            status = response.status;
            return response.json();
        })
        .then((data) => {
            // Setting the data variable.
            dispatch(editSuccess())
        }).catch(err => {
            console.log(err)
        })}
}
export const editSuccess = () => {
    return {
        type: EDIT_POST_SUCCESS,
        status:status
    }
}

export const deleteAccount = (token)=> {
    const opts = {}
    return (dispatch) => {
        fetch(`https://awn-backend.herokuapp.com/api/users/deactivate`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(opts) // body data type must match "Content-Type" header
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // Setting the data variable.
            console.log(data)
        }).catch(err => {
            console.log(err)
        })}
}
import { REGISTER_SUCCESS } from "./registerTypes"
// import thunk from "redux-thunk"

const ip = "localhost"
var status= "";

export const register = (userName,email,password,phoneNumber,name) => {
    const opts = {
        name:name,
        userName:userName,
        email:email,
        phone:phoneNumber,
    }

    return (dispatch) => {
        fetch(`http://${ip}:5000/api/users/register`,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json',
        'Authorization': password
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(opts)
        })
        .then(Response => {
            status = Response.status;
            return Response.json();
        })
        .then(
            (result) => {
                // Display error messages if values are incorrect.
                console.log(result)
                dispatch(registerSuccess())
            },
        )
        .catch(
            (err) => console.log(err)
        )
    }
}

export const registerSuccess =  () => {
    return {
        type:REGISTER_SUCCESS,
        status:status
    }
}
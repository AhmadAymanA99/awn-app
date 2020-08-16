import { LOG_IN_SUCCESS, LOG_IN_FAILURE, CHANGE_PASSWORD, LOG_OUT } from "./loginTypes"
// import thunk from "redux-thunk"

const ip = "localhost";

var status = "";
export const login = (userName, password) => {
    const opts = {
        userName: userName,
    }

    return (dispatch) => {
        fetch(`http://${ip}:5000/api/users/login`, {
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
                body: JSON.stringify(opts) // body data type must match "Content-Type" header
            })
            .then((response) => {
                status = response.status;
                return response.json();
            })
            .then((data) => {
                // Setting the data variable.
                dispatch(loginSuccess(data))
            }).catch(err => {
                dispatch(loginFailure())
            })
    }
}

export const loginSuccess = (user) => {
    return {
        type: LOG_IN_SUCCESS,
        userName: user.user.userName,
        name: user.user.name,
        rate: user.user.rate,
        email: user.user.email,
        phoneNumber: user.user.phoneNumber,
        status: status,
        token: user.token,
    }
}

export const loginFailure = () => {
    return {
        type: LOG_IN_FAILURE,
        status: status
    }
}

export const changePassword = (password, token) => {
    const opts = {
        password: password
    }
    fetch(`http://${ip}:5000/api/users/userChangePassword`, {
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
        .then((result) => {
            // Setting the data variable.
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    return {
        type: CHANGE_PASSWORD,
    }
}

export const logout = () => {
    localStorage.setItem("token", "")
    localStorage.setItem("userName", "")
    localStorage.setItem("email", "")
    localStorage.setItem("phoneNumber", "")
    localStorage.setItem("name", "")
    localStorage.setItem("rate", "")

    return {
        type: LOG_OUT
    }
}
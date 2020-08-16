import { REMOVE_POST , REMOVE_REPORT , BAN_USER , ADMIN_LOG_IN_SUCCESS,ADMIN_GET_REPORT_ITEMS_SUCCESS, ADMIN_LOG_IN_FAILURE } from './adminTypes'
// import thunk from "redux-thunk"

const ip = "localhost"
var status;

export const removePost = (reportId,token) => {
    const opts = {
        reportId:reportId
    }

    fetch(`http://${ip}:5000/api/admins/removePost`,{
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
        body: JSON.stringify(opts)
    })
    .then(Response => { 
        Response.json()
    })
    .then(
        (result) => {
            // Display error messages if values are incorrect.
            console.log("Post Removed")
        },
    )
    .catch(
        (err) => console.log(err)
    )
    return {
        // Setting the values we get from calling the function.
        type:REMOVE_POST,
    }
}

export const removeUser = (reportId,token) => {
    const opts = {
        reportId:reportId
    }

    fetch(`http://${ip}:5000/api/admins/banUser`,{
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
        body: JSON.stringify(opts)
    })
    .then(Response => { 
        Response.json()
    })
    .then(
        (result) => {
            // Display error messages if values are incorrect.
            console.log("User Banned: " + result)
        },
    )
    .catch(
        (err) => console.log(err)
    )
    return {
        // Setting the values we get from calling the function.
        type:BAN_USER,
    }
}

export const removeReport = (reportID,token) => {

    const opts = {
        _id : reportID
    }

    fetch(`http://${ip}:5000/api/admins/removeReport`,{
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
        body: JSON.stringify(opts)
    })
    .then(Response => Response.json())
    .then(
        (result) => {
            // Display error messages if values are incorrect.
            console.log(result)
        },
    )
    .catch(
        (err) => console.log(err)
    )
    return {
        // Setting the values we get from calling the function.
        type:REMOVE_REPORT,
    }
}

export const adminLogin = (userName,password) => {

    const opts = {
        adminName:userName,
    }

    return (dispatch) => {
        
        fetch(`http://${ip}:5000/api/admins/login`,{
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
            status = response.status
            return response.json();
        })
        .then((data) => {
            // Setting the data.
            dispatch(adminLoginSuccess(data,userName))
        }).catch(err => {
            dispatch(adminLoginFailure())
        })
    }
}

export const adminLoginSuccess = (admin,userName) => {
    return {
        type:ADMIN_LOG_IN_SUCCESS,
        adminName:userName,
        status:status,
        token:admin.token
    }
}

export const adminLoginFailure = () => {
    return {
        type: ADMIN_LOG_IN_FAILURE,
        status:status
    }
}


export const adminGetReportItems = (token) => {

    const opts = {
    }
    

    return (dispatch) => {
        fetch(`http://${ip}:5000/api/admins/viewReportedPosts`,{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            // 'Content-Type': 'applicationn/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(opts) // body data type must match "Content-Type" header
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            dispatch(adminGetReportItemsSuccess(data))
            // Setting the data variable.
        }).catch(err => {
            console.log(err)
        })
    }
}
export const adminGetReportItemsSuccess= (adminReports) => {
    return {
        // Setting the values we get from calling the function.
        type:ADMIN_GET_REPORT_ITEMS_SUCCESS,
        reports:adminReports
    }
}


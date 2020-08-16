import { CREATE_POST } from './createPostTypes'
const ip = 'localhost'

export const createPost = (title,description,location,tags,token,categoryName,subCategoryName) => {
    //console.log(token)
    const opts = {
        title: title,
        description:description,
        tags:tags,
        location:location,
        categoryName:categoryName,
        subCategory:subCategoryName
    }

    // API CALL
    fetch(`http://${ip}:5000/api/posts`,{
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
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
    return {
        // Setting the values we get from calling the function.
        type:CREATE_POST,
    }
}

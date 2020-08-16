import React , {useState, useEffect} from 'react'
import {useLocation } from 'react-router-dom'
import './style/createPostContainer.scss'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import { editPost } from '../redux'
import {Button} from 'react-bootstrap'

function EditPost(props) {
    
    // initializing Post Attributes
    let location = useLocation();
    const [categoryName,setCategoryName] = useState("")
    const [subCategoryName,setSubCategoryName] = useState("")
    const [title, setTitle] = useState(location.state.post.title)
    const [tags, setTags] = useState(location.state.post.tags)
    const [description, setDescription] = useState(location.state.post.description)
    const [postLocation, setPostLocation] = useState(location.state.post.location)
    const [subCategories,setSubCategories] = useState([])
    const [postId,] = useState(location.state.post._id)

    useEffect(() => {
        if (props.status === 200){
            props.history.push(`/post/${postId}`)
        }
    }, [props]); // Adding the props in order to handle change to ui whenever something gets changed. 

    const getSubCategories = (categoryName,setSubCategories)=>{
        if(categoryName === "Donation"){
            setSubCategories(["Medical Bills","Home Furniture","Sports","Clothes","Kitchen","Electronics","Tools","Toys","Home Applicances","Jewelry","Books"])
        }
        else if(categoryName === "Volunteering"){
            setSubCategories(["Teaching","Sports","Work","Help elders","Help orphans"])
        }
        else if(categoryName === "Recycling"){
            setSubCategories(["Plastic","Paper","Glass","Metal","Carton"])
        }
    } 
    return (
        <Fragment>
            <div className="container" id="createPostHolder">

                    <input type="text" value={title} className="input-group mb-3 tBig" onChange={e => setTitle(e.target.value)} placeholder="Title" /> <span>   </span>
                    
                    <input type="Location" value={postLocation} className="input-group tBig" placeholder="Location" onChange={e => setPostLocation(e.target.value)} /> <br></br>
                    
                    <textarea value={description} placeholder="Description (Must be more than 50 characters)" className="form-control" onChange={e => setDescription(e.target.value)}></textarea><br></br>
                    <input type="text" className="input-group mb-3 tBig" value={tags} placeholder="Please enter tags with a space between each word" onChange={e => setTags(e.target.value)} />
                    
        

                    <select name="categoryName" onChange={e => {
                        setCategoryName(e.target.value)
                        getSubCategories(e.target.value,setSubCategories)
                    }} className="form-control" id="exampleFormControlSelect1">
                        <option value="" selected disabled hidden>Choose Category</option>
                        <option value="Donation">Donation</option>
                        <option value="Recycling">Recycling</option>
                        <option value="Volunteering">Volunteering</option>
                    </select>
                    <br></br>
                    {/* Adding the categories dynamically. */}
                    {subCategories.length !== 0?
                    <select name="categoryName" onChange={e => setSubCategoryName(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                        <option value="" selected disabled hidden>Choose Subcategory</option>
                                {subCategories.map((key,index) =>{
                                    return(
                                        <option key={index} value={key}>{key}</option>
                                    )
                                })}
                    </select>
                    :null}
                    <div className="text-center" id="createPostButton">
                        <Button style={{backgroundColor:"#009899" , border:"none"}} 
                        onClick={() =>
                        {                 
                            if(title!== "" && location !== "" && description !== "" && tags !== "" && categoryName !== "" && subCategoryName !== ""){
                                if(description.length < 50){
                                    alert("Description field must contain at least 50 characters.")
                                }
                                else{
                                    props.editPost(title, description, postLocation, tags, categoryName, subCategoryName, localStorage.getItem("token"), postId)
                                }
                            }    
                            else {
                                alert("Please enter all the data required for your post.")
                            }
                        }
                        }>Submit</Button>
                    </div>

                </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        token:state.login.token,
        status:state.userProfile.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // This maps the functions from the loginActions/userActions to the one we call here. 
        editPost: (title, description, location, tags, categoryName, subCategoryName, token, postId) => dispatch(editPost(title, description, location, tags, categoryName, subCategoryName, token, postId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)

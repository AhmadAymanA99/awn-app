import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../redux'
import './style/createPostContainer.scss'
import { Fragment } from 'react'
import {Button} from 'react-bootstrap'



function CreatePostContainer(props) {

    // Post info
    const [categoryName,setCategoryName] = useState("")
    const [subCategoryName,setSubCategoryName] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [tags, setTags] = useState("")
    const [subCategories,setSubCategories] = useState([])


    useEffect(() => {
    }, []); // Adding the props in order to handle change to ui whenever something gets changed. 


    return (
        <Fragment>
            <div className="container" id="createPostHolder">

                <input type="text" className="input-group mb-3 tBig" onChange={e => setTitle(e.target.value)} placeholder="Title" /> <span>   </span>
                <input type="Location" className="input-group tBig" placeholder="Location" onChange={e => setLocation(e.target.value)} /> <br></br>
                <textarea placeholder="Description (Must be more than 50 characters)" className="form-control" onChange={e => setDescription(e.target.value)}></textarea><br></br>
                <input type="text" className="input-group mb-3 tBig" placeholder="Please enter tags with a space between each word" onChange={e => setTags(e.target.value)} />

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
                                props.createPost(title, description, location, tags,localStorage.getItem("token"),categoryName,subCategoryName)
                                props.history.push("/")
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

const getSubCategories = (categoryName,setSubCategories)=>{
    if(categoryName === "Donation"){
        setSubCategories(["Blood Plasma","Medical Bills","Home Furniture","Sports","Clothes","Kitchen","Electronics","Tools","Toys","Home Applicances","Jewelry","Books"])
    }
    else if(categoryName === "Volunteering"){
        setSubCategories(["Teaching","Sports","Work","Help elders","Help orphans"])
    }
    else if(categoryName === "Recycling"){
        setSubCategories(["Plastic","Paper","Glass","Metal","Carton"])
    }
} 
const mapStateToProps = state => {
    return {
        token:state.login.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // This maps the functions from the loginActions/userActions to the one we call here. 
        createPost: (title, description, location, tags,token, categoryName,subCategoryName) => dispatch(createPost(title, description, location, tags,token, categoryName,subCategoryName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostContainer)
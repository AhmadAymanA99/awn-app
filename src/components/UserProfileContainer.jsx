import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { getUserPosts, getUserData, changePassword, rateUser, deleteAccount, logout } from '../redux'
import { Button, Col ,Row} from 'react-bootstrap'
import './style/userProfileContainer.scss'
import Post from "./Post.jsx"
import ReactStars from 'react-stars'
import { useHistory } from "react-router-dom";



function UserProfileContainer(props) {
    const history = useHistory()
    const ratingChanged = (newRating) => {
        props.rateUser(localStorage.getItem("token"),newRating,userName)
    }
    // Setting the state in this components
    // USER INFO
    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [rate, setRate] = useState()

    // BUTTON CLICKS
    const [changingPassword, setChangingPassword] = useState(0)
    const [viewPosts, setViewPosts] = useState(0)

    const [showRateUser, setShowRateUser] = useState(0)
    // DATA from state
    const [userPosts, setUserPosts] = useState([])


    // This hook is pretty much componentDidMount, componentDidUpdate, and componentWillUnmount together.
    useEffect(() => {

        // Setting all his values. 
        if (window.location.href === "http://localhost:3000/user/" + localStorage.getItem("userName")) {
            setUserName(localStorage.getItem("userName"))
            setEmail(localStorage.getItem("email"))
            setPhoneNumber(localStorage.getItem("phoneNumber"))
            setRate(localStorage.getItem("rate"))
            setName(localStorage.getItem("name"))
        }
        else {
            var url = (window.location.pathname).split('/')
            props.getUserData(url[2])
            setUserName(props.userName)
            setEmail(props.email)
            setPhoneNumber(props.phoneNumber)
            setRate(props.rate)
            setName(props.name)
            setShowRateUser(1)
        }


        setUserPosts(props.userPosts) // Mapping the values
        //console.log(props.userPosts)
    }, [props]); // Adding the props in order to handle change to ui whenever something gets changed. 

    return (
        <Fragment>
            <div className="container" id="userProfileHolder">

                <div id="userProfilePersonalInfo">
                    <h2>Username: {userName}</h2>
                    <h2>Name: {name}</h2>
                    {localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null?
                        <h2>Email: {email}</h2>: null
                    }
                        

                    {localStorage.getItem("userName") === userName  && localStorage.getItem("userName") !== ""?
                        <div id="passwordContainer">
                            {/*Here, We check if the changingPassword === 0 in order to show the Change Password button*/}
                            {changingPassword === 0 ? <Button style={{ backgroundColor: "#009899", border: "none" }} onClick={() => { setChangingPassword(1) }}>Change password</Button> : null}

                            {/*Here, We set the changing password button to 1 in order to show the Change Password part*/}
                            {changingPassword === 1 ?
                                <div>
                                    <input type="password" className="newPassword" className="input-group mb-2" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" />
                                    <input type="password" className="newPassword" className="input-group mb-2" value={password2} onChange={e => setPassword2(e.target.value)} placeholder="Confirm Password" />

                                    <Button style={{ backgroundColor: "#009899", border: "none" }} onClick={() => {
                                        if (password.length < 6) {
                                            alert("Password must be at least 6 characters.")
                                        }
                                        else if (password !== password2) {
                                            alert("Please write the same password in the 2 fields.")
                                        }
                                        else {
                                            alert("Password changed successfully.")
                                            setPassword("")
                                            changePassword(password, localStorage.getItem("token"))
                                            setChangingPassword(0);
                                        }
                                    }}>Confirm change</Button>

                                    <br></br>
                                </div>
                                : null
                            }<br></br>
                        </div>
                        : null}

                    <Row>
                        {localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null?
                        <Col>
                        <h3 >Phone Number: <a href="tel:+{phoneNumber}">{phoneNumber}</a></h3>
                        </Col> : null
                    }
                        <Col md={{ span: 3, offset: 2 }}><h3 >Rating: {rate}</h3></Col>
                    </Row>

                    {showRateUser === 1 && localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null? 

                    <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    color2={'#ffd700'} />
                    : null
                } 
                </div>

                {localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null && localStorage.getItem("userName") === userName?
                <div className="text-center">
                    <Button variant="danger" onClick={() => {
                        props.deleteAccount(localStorage.getItem("token"))
                        history.push("/")
                        props.logout()
                        }}>Deactivate account</Button>
                    <p>You can activate the account again by logging in during the next 30 days.</p>
                </div>
                :null}
                <hr />

                {/*Here, We check the viewPosts === 0 in order to show the view posts Button*/}
                {viewPosts === 0 ?
                    <Button style={{ backgroundColor: "#009899", border: "none", marginLeft: "20px" }} onClick={() => {
                        setViewPosts(1) // Hiding the button
                        props.getUserPosts(userName) // Calling the API

                    }}>View posts</Button>
                    : null}

                {viewPosts === 1 && props.loadingPosts === "true" ?
                    <div className="row" style={{paddingLeft:"40px"}}>
                        {userPosts !== undefined && userPosts.length !== 0 ?
                            userPosts.map(post => {
                                // setCurrentIndex(index)
                                // console.log(currentIndex)
                                return (
                                    <div key={post._id} className="col-lg-4">
                                        <Post post={post}></Post>
                                    </div>
                                )
                            })
                            :
                            <h3 id="userNoPosts">This user doesn't have any posts.</h3>}
                    </div>
                    : null}

            </div>
        </Fragment>
    );
}

const mapStateToProps = state => {
    //console.log(state
    return {

        userName: state.userProfile.userName,
        phoneNumber: state.userProfile.phoneNumber,
        rate: state.userProfile.rate,
        email: state.userProfile.email,
        name: state.userProfile.name,

        userPosts: state.userProfile.posts,
        loadingPosts: state.userProfile.loadingPosts,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // This maps the functions from the loginActions/userActions to the one we call here. 
        getUserPosts: (userName) => dispatch(getUserPosts(userName)),
        getUserData: (userName) => dispatch(getUserData(userName)),
        changePassword: (password, token) => dispatch(changePassword(password, token)),
        rateUser: (token, rate,userName) => dispatch(rateUser(token, rate,userName)),
        deleteAccount:(token) => dispatch(deleteAccount(token)),
        logout:() => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
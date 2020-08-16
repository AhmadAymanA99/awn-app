import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Dropdown, Modal, Spinner } from 'react-bootstrap'
import Footer from './Footer';
import Navbar from './NavBar';
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'
import './style/post.css'
import { GetUserApi, GetPostByIDApi, ReportPostApi, UpdateStatusApi, DeletePostApi } from '../Api/PostsApis'

function PostPage(props) {
    const [pNoShowed, setpNoShowed] = useState(false);
    const [repShowed, setRepShowed] = useState(false);
    const [repBody, setRepBody] = useState('');
    const [RemoveShowed, setRemoveShowed] = useState(false);
    const [repShowedrep, setRepShowedRep] = useState(false);
    const [removeBody, setremoveBody] = useState('');

    //state that will carry he posts
    const [posts, setposts] = useState({
        loading: true,
        error: '',
        post: []
    })

    // Used by router to navigate back to home after deleting a post
    const history = useHistory()

    //state that will carry the user
    const [userInfo, setUserInfo] = useState([])

    //Reports Modal
    const handleClose = () => setRepShowed(false);
    const handleCloserep = () => setRepShowedRep(false);
    const handleCloseRemove = () => setRemoveShowed(false);

    // Getting User who submitted the post Information
    const getUser = (userId) => {
        fetch(`${GetUserApi}${userId}`)
            .then(Response => Response.json())
            .then(Response => {
                setUserInfo(Response)
            })
            .catch(err => {
            })
    }

    //Getting Post Information 
    const { id } = props.match.params;
    useEffect(() => {
        fetch(`${GetPostByIDApi}${id}`)
            .then(Response => Response.json())
            .then(Response => {
                setposts({
                    loading: false,
                    post: Response,
                    error: ''
                })
                console.log(Response)
                getUser(Response.user)
            })
            .catch(err => {
                setposts({
                    loading: false,
                    post: [],
                    error: JSON.stringify(err)
                })
            })
    }, [])


    //Sending Report 
    const body = {
        id: localStorage.getItem('token'),
        postID: id,
        description: repBody
    }
    const sendReport = () => {

        fetch(ReportPostApi, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        })
            .then((response) => {
                console.log(response)
                if (response.status == 400) {
                    setRepShowedRep(true)
                }
                return response.json();
            })
            .then((res) => {
                console.log(res)
            }).catch(err => {
            })
        setRepShowed(false);
    }

    // Delete Post
    const deletePost = () => {
        fetch(`${DeletePostApi}${id}`, {
            method: 'DELETE',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
        })
            .then((Response) => {
                if (Response.status == 200){
                    history.push("/")
                }
                return Response.json();
            })
            .then(Response => {
                setRemoveShowed(false);
            })
            .catch(err => {
                setRemoveShowed(false);
            })
    }
    /////////////////////////////////////////////////////////////////////////////////////

    //Update post status
    const removeORdeleteBody = {
        id: id,
        status: removeBody,
        editCode: "Admin_AWN"

    }
    const removePost = () => {
        if (removeBody == "gotHelp") {
            console.log("got help invoked")
            fetch(`${UpdateStatusApi}${id}`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(removeORdeleteBody) // body data type must match "Content-Type" header
            })
                .then((response) => {
                    return response.json();
                })
                .then((res) => {
                }).catch(err => {
                })
        }
        else if (removeBody == "Deleted") {
            return deletePost()
        }
        setRemoveShowed(false);
    }



    // setting up date
    const day = moment(posts.post.date, "YYYYMMDD").fromNow()
    const days = day.split(" ");
    var end = days[0];
    var endDate;
    (days[1] != 'days') ? endDate = 30 : endDate = 30 - end;
    


    // setting up location
    var location = "";
    if (posts.post.location === null)
        location = "Abaseya"
    else
        location = posts.post.location


    return (
        <div >

            <div style={{ marginTop: "100px", marginBottom: "100px" }}>

                {/* Loading */}
                {posts.loading &&
                    <Row className="justify-content-md-center" >
                        <Spinner style={{ marginTop: "100px", marginBottom: "200px" }} animation="grow" variant="success" />
                    </Row>}

                {/* Page Loaded Error */}
                {posts.err &&
                    <Row className="justify-content-md-center" style={{ marginTop: "100px", marginBottom: "200px" }}>
                        <h3 style={{ color: "red" }}>{posts.error}</h3>
                    </Row>}

                {/* Page Loaded Succesfully */}
                {!posts.error && !posts.loading &&
                    <Container className="ppagecont" style={{ width: "70%" }}>

                        {/*                                           Post                                             */}
                        {/**********************************************************************************************/}

                        {/* Title */}
                        <Row className="justify-content-md-center" style={{ backgroundColor: "#009899", color: "#ffffff", paddingBottom: "20px", paddingTop: "20px" }}>
                            <Col md={"1"} ><img src={"https://image.flaticon.com/icons/svg/1946/1946433.svg"} alt="Logo" style={{ width: "40px", height: "40px" }} /></Col>
                            <Col md={"10"} style={{ textAlign: "center" }}><h2 >{posts.post.title}</h2></Col>
                            <Col md={"1"} style={{ textAlign: "center" }}>Views: <br /> {posts.post.numViews}</Col>
                        </Row>

                        <br />

                        {/* Description */}
                        <Row className="justify-content-md-center ppagetext" style={{ marginTop: "15px", marginBottom: "40px" }}>
                            <Col md={"7"} style={{ fontSize: "18px" }}>{posts.post.description}</Col>
                        </Row>

                        <hr />

                        {/* Date Added / Ended / Location */}
                        <Row className="ppagetext" >
                            <Col ><p>Added : {day}</p></Col>
                            <Col ><p>Ending in : {endDate} days</p></Col>
                            <Col ><p>Location : {location}</p></Col>
                        </Row>

                        <br />
                        {/* Added by / Rating / Phone Number */}
                        <Row className="ppagetext" >
                            <Col >Added By : <Link to={`/user/${userInfo.username}`} >{userInfo.username}</Link></Col>
                            <Col>User Rating : {userInfo.rating}</Col>
                            <Col style={{ paddingBottom: "10px", bottom: "5px" }}>
                                {pNoShowed ? <p>Phone Number : <a href="tel:+{userInfo.Phonenumber}">{userInfo.Phonenumber}</a> </p> :
                                    <Button disabled={(localStorage.getItem('userName') === "")} style={{ backgroundColor: "#009899", border: "none" }} onClick={() => setpNoShowed(true)}>Show Number</Button>
                                }
                            </Col>
                        </Row>

                        {/*                                           Drop Down Buttons                                           */}
                        {/*********************************************************************************************************/}



                        {/* Report Button */}
                        {localStorage.getItem('userName') !== "" &&
                            localStorage.getItem('userName') !== userInfo.username &&
                            <Dropdown >
                                <Dropdown.Toggle id="dropdown-basic" className="ppagereport" style={{ backgroundColor: "rgb(236, 52, 52)" }}>
                                    Report
                    </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as="button" onClick={() => { setRepShowed(true); setRepBody('Spam'); }}>Spam</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={() => { setRepShowed(true); setRepBody('Inappropriate Content'); }}> Inappropriate Content</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={() => { setRepShowed(true); setRepBody('Already Helped This User'); }}>Already Helped This User</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>}

                        {/* Remove Button */}
                        {localStorage.getItem('userName') === userInfo.username &&
                            <Dropdown >
                                <Dropdown.Toggle id="dropdown-basic" className="ppagereport" style={{ backgroundColor: "rgb(236, 52, 52)" }}>
                                    Remove
                    </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as="button" onClick={() => { setRemoveShowed(true); setremoveBody("gotHelp"); }}>Help Received</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={() => { setRemoveShowed(true); setremoveBody("Deleted"); }}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>}



                        {/* Edit Button */}
                        {localStorage.getItem('userName') === userInfo.username &&

                            <Link to={{
                                pathname: '/EditPost',
                                state: {
                                    post: posts.post
                                }
                            }}>
                                <Button id="dropdown-basic" className="ppagereport" style={{ backgroundColor: "rgb(34, 173, 92)", marginRight: "5px" }}>Edit</Button>
                            </Link>}




                        {/*                                           MODALS                                           */}
                        {/**********************************************************************************************/}

                        {/* Post Already Reported Modal */}
                        <Modal show={repShowedrep} onHide={handleCloserep}>
                            <Modal.Header closeButton>
                                <Modal.Title style={{ textAlign: "center", fontFamily: "Arial, Helvetica, sans-serif", display: "inline" }}>
                                    <p>You Already Reported this post please wait for admin to take action</p>
                                </Modal.Title>
                            </Modal.Header>
                        </Modal>

                        {/* Report Modal */}
                        <Modal show={repShowed} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Report</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ textAlign: "center", fontFamily: "Arial, Helvetica, sans-serif", display: "inline" }}>
                                Are you sure you want to report this post? <hr /><p style={{ fontWeight: "bold" }}>Carefull</p> false reports can eventually lead to account ban !!</Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={sendReport}>
                                    Yes
                    </Button>
                                <p></p>
                                <Button variant="primary" onClick={handleClose}>
                                    No
                    </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Remove Modal */}
                        <Modal show={RemoveShowed} onHide={handleCloseRemove}>
                            <Modal.Header closeButton>
                                <Modal.Title>Remove Post</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ textAlign: "center", fontFamily: "Arial, Helvetica, sans-serif", display: "inline" }}>
                                Are you sure you want to Remove this post? </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={removePost}>
                                    Yes
                    </Button>
                                <p></p>
                                <Button variant="primary" onClick={handleCloseRemove}>
                                    No
                    </Button>
                            </Modal.Footer>
                        </Modal>
                    </Container>}
            </div>

        </div>
    )
}

export default PostPage




import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { adminGetReportItems, removePost, removeReport, removeUser } from '../redux'
import "./style/adminContainer.scss"
import Post from "./Post.jsx"

function AdminContainer(props) {
    // Admin info we need. 
    const [reports, setReports] = useState([])
    const [userName, setUserName] = useState("")
    // const [posts, setPosts] = useState([])

    // Handle issues with data
    const [showReports, setShowReports] = useState(0)


    // Showing and hiding posts
    // const [showPosts, setShowPosts] = useState(0)

    useEffect(() => {

        if(localStorage.getItem("adminToken") === null || localStorage.getItem("adminToken") === ""){
            localStorage.setItem("adminToken", (String)(props.token))
            localStorage.setItem("adminName", (String)(props.userName))
        }

        else if(localStorage.getItem("adminToken") !== props.token && props.token !== ""){
            localStorage.setItem("adminToken", (String)(props.token))
            localStorage.setItem("adminName", (String)(props.userName))
        }

        // Setting the values.
        setUserName(localStorage.getItem("adminName"))
        setReports(props.reports)
        // setPosts(props.posts)

        // This is done to prevent the app from breaking before the item retrival is done.
    }, [props])
    return (
        <div className="container" id="adminContainerHolder">

            <h1>Admin: {userName}</h1>


                                {/* Here we have the REPORTS area */}
            <div id="adminReportsArea">
            <button className="btn btn-success" onClick={() => {
                showReports === 1? setShowReports(0) : 
                setShowReports(1)
                props.getReportItems(localStorage.getItem("adminToken"));
            }}>Show/Hide Reports</button>


                {showReports === 1?
                    <ul id="adminReports">
                        { reports.length !== 0? 
                            reports.map((report,index) => {   
                            console.log(report)                         
                            return (
                                <div className="reportHolder">
                                    <li key={report._id}>Report description: {report.description}</li>
                                    <div className="row">
                                        <div id="adminReportedPost">
                                            <Post post={report.postData}></Post>
                                        </div>
                                    </div>
                                    <button className="btn btn-success" onClick={() => {
                                        props.removeReport(report._id,localStorage.getItem("adminToken"))
                                        }
                                    }
                                    >Remove report</button>

                                    <button className="btn btn-danger" onClick={() => props.removeUser(report._id,localStorage.getItem("adminToken"))}>Ban user</button>
                                    <button className="btn btn-danger" onClick={() => props.removePost(report._id,localStorage.getItem("adminToken"))}>Remove post</button>
                                </div>
                            )})
                            : <h1>You have no reports for now :) </h1>
                        }
                    </ul>: 
                null}
            </div>

            {/* <hr></hr> */}


                                {/* HERE WE HAVE THE POSTS area
            <div id="adminPostsArea">
                <button className="btn btn-success" onClick={() => {
                    showPosts === 1 ? setShowPosts(0) : setShowPosts(1)
                }}>Show/Hide Posts</button>

                {showPosts === 1 ?
                    <ul id="adminPosts">
                        {posts.map((value, index) => {
                            return (
                                <div id="postHolder">
                                    <li key={index}>{value}</li>
                                    <button className="btn btn-danger" onClick={() => props.removeUser(index)}>Ban user</button>
                                    <button className="btn btn-danger" onClick={() => props.removePost(index)}>Remove post</button>
                                </div>
                            )
                        })}
                    </ul>:null}
            </div> */}



        </div>
    )
}


const mapStateToProps = state => {
    return {
        userName: state.admin.adminName,
        token: state.admin.token,
        reports: state.admin.reports,
        posts: state.admin.posts,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getReportItems: (token) => dispatch(adminGetReportItems(token)),
        removePost: (reportId,token) => dispatch(removePost(reportId,token)),
        removeUser: (reportId,token) => dispatch(removeUser(reportId,token)),
        removeReport: (reportId,token) => dispatch(removeReport(reportId,token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
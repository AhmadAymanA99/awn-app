import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './style/post.css'
import {PostApi} from '../Api/PostsApis'

function Post(props) {
    
    // setting up date
    const day = moment(props.post.date, "YYYYMMDD").fromNow()
    const days = day.split(" ");
    var end = days[0];
    var endDate;
    (days[1] != 'days') ? endDate = 30 : endDate = 30 - end;
    
    
    

    //setting up location
    var location = "";
    (props.post.location)?location = props.post.location:location = "Unknown"


    const increment = () =>{ fetch(`${PostApi}${props.post._id}`)
    .then(Response => Response.json())
    .then(Response => {
    }) 
    .catch(err=>{
    })
    }
    return (

        <Link to={`/post/${props.post._id}`} className='tweet' style={{ textDecoration: "none" }}>
            <Card className="pcard" onClick={increment} hoverable="true">
                <div style={{ backgroundColor: "#f7fcfa", height: "115px" }}>
                    <Card.Body style={{ backgroundColor: "#009899", color: "#ffffff", borderRadius: "7px 7px 20px 20px", height: "110px" }}>
                        <Card.Title className="pcardtitle" >{props.post.title}</Card.Title>
                    </Card.Body>
                </div>
                <div style={{ backgroundColor: "rgb(228, 228, 228)", borderRadius: "0px 0px 10px 10px" }}>
                    <Card.Body style={{ borderRadius: "0px 0px 15px 15px", backgroundColor: "#f7fcfa" , minHeight:"90px"}}>
                        <Card.Text className="pcardbody"> {props.post.description}</Card.Text>
                    </Card.Body>
                    <div style={{ backgroundColor: "rgb(228, 228, 228)", display: "inline", borderRadius: "0px 0px 10px 10px" }}>
                        <div style={{ clear: "both" }}>
                            <p className="text-muted pll" >views {props.post.numViews} </p>
                            <p className="text-muted prr" >Added {day}</p> <br />

                            <p className="text-muted pll">Location: {location}</p>
                            <p className="text-muted prr"> Ending in {endDate} days</p>
                        </div>
                    </div>
                </div>


            </Card>
        </Link>

    )
}


export default Post

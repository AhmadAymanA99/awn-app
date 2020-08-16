import React from 'react'
import PostList from './PostList'
import './style/post.css'
import { Container } from 'react-bootstrap'
import {AllRecycleLimit , AllVolunteerLimit , AllDonationLimit} from '../Api/PostsApis'
function LandingPosts() {

    return (
        <div className="LandingPosts">
            <Container className="contland ">
                <a href="/volunteering" className="postsa"> Volunteering</a>
                <PostList url={AllVolunteerLimit} />
            </Container>
            <Container className="contland">
                <a href="/donations" className="postsa">Donations</a>
                <PostList url={AllDonationLimit} />
            </Container>

            <Container className="contland">
                <a href="/recycling" className="postsa">Recycling</a>
                <PostList url={AllRecycleLimit} />
            </Container>
        </div>
    )
}

export default LandingPosts

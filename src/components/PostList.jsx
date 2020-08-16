import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'
import Post from './Post'
import './style/post.css'
import { Row, Col } from 'react-bootstrap'

function PostList(props) {
    const [posts, setposts] = useState({
        loading: true,
        error: '',
        postList: []
    })

    useEffect(() => {
        axios.get(props.url)
            .then(res => {
                setposts({
                    loading: false,
                    postList: res.data,
                    error: ''
                })
            })
            .catch(err => {
                setposts({
                    loading: false,
                    postList: [],
                    error: err.message
                })
            })
    }, []);
    const allPosts = posts.postList.map(poster => {
        return (
            <Col key={poster._id} md={6} lg={6} xl={4} sm={12} xs={12}>
                <Post post={poster} />
            </Col>
        )
    })


    return posts.loading ? (
        <Row className="justify-content-md-center">
            <Spinner animation="grow" variant="success" />
        </Row>
    ) : posts.error ? (
        <Row className="justify-content-md-center">
            <h3 style={{ color: "red" }}>{posts.error}</h3>
        </Row>
    ) :(
        <div>
            <Row className=" flex-nowrap scoll" style={{ overflowX: "scroll", alignItems: "center" }}>
                {allPosts}
            </Row>

        </div>
    )

}


export default PostList

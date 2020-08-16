import React, { Component, Fragment } from 'react'
import LandingPosts from './LandingPosts'
import JumpotronContainer from './JumpotronContainer'
import { connect } from 'react-redux'

export class LandingPage extends Component {
    render() {
        return (
            <Fragment>
                <JumpotronContainer />
                <LandingPosts />
            </Fragment>
        )
    }
}

function mapStateToProps({ login }) {
    return {
        login
    }
}

export default connect(mapStateToProps)(LandingPage)

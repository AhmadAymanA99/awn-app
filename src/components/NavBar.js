import React, { Component, Fragment } from 'react'
import logo2 from './style/logo2.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import LoginContainer from './LoginContainer'
import { logout } from '../redux'

class NavBar extends Component {
    state = {
        showLogin: false
    }

    handleClose = () => this.setState({
        showLogin: false
    })
    handleShow = () => this.setState({
        showLogin: true
    })

    render() {
        const { logout } = this.props
        return (
            <Fragment>
                <div id='navBar'>
                    <Link to='/'>
                        <img className='logo' src={logo2} alt='awn-logo' />
                    </Link>
                    <div id="categoriesNav">
                        <Link to='/search'>All Categories</Link>
                        <Link to='/volunteering'>Volunteering</Link>
                        <Link to='/donations'>Donations</Link>
                        <Link to='/recycling'>Recycling</Link>
                        {
                            localStorage.getItem("userName")
                                ? <Link className='newpostBtn' to='/createpost'>Create Post</Link>
                                : ''
                        }
                    </div>
                    <div className='rightDiv'>
                        {
                            localStorage.getItem("token")
                                ? <Fragment>
                                    <Link className='username' to={`/user/${localStorage.getItem("userName")}`} >My Profile</Link>
                                    <Link to='/'>
                                        <button className='regButton' name='logout' onClick={() => { logout() }}>LOGOUT</button>
                                    </Link>
                                </Fragment>
                                : <Fragment>
                                    <Link to='register'>
                                        <button className='regButton' name='register'>Register Now</button>
                                    </Link>
                                    <button className='regButton' name="login" onClick={this.handleShow}>
                                        Sign In
                                    </button>
                                    <Modal show={this.state.showLogin} onHide={this.handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Sign In</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body><LoginContainer history={this.props.history} close={this.handleClose} /></Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Fragment>
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({ login }) {
    return {
        login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {adminLogin} from '../redux'
import './style/adminLoginContainer.scss'

function AdminLoginContainer(props){
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    
    useEffect(() => {
        if(props.status === 404)
            alert("Admin Name or password is incorrect.")
        else if(props.status === 200){
            props.history.push('/admin/page')
        }
    }, [props])

    return (
        <div className="container" id="adminLoginContainer">
            <h3>Username </h3> <span>  </span>
            <input type="text" className="input-group" value={userName} placeholder="Admin" onChange={e => setUserName(e.target.value)}/>
            <br></br>
            <h3>Password </h3> <span>  </span>
            <input type="password" className="input-group" value={password} placeholder="******" onChange={e => setPassword(e.target.value)}/>
            <br></br>
            <div id="adminLoginButton" className="text-center">
                <button className="btn btn-success" onClick={() => {
                    if(userName === "" || password === "")
                        alert("Username and password need to be entered.")
                    else
                        props.adminLogin(userName,password)
                }}>Submit</button>
                    
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        userName: state.admin.userName,
        password: state.admin.password,
        status: state.admin.status,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        adminLogin: (userName,password) => dispatch(adminLogin(userName,password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps,)(AdminLoginContainer)

// FOR BOOTSTRAP PURPOSES (HAS ISSUES)
/*
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {login} from '../redux'

import { Button, Form, FormGroup, Label,Input } from 'react-bootstrap'

function RegisterContainer(props){
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    
    return (
        <Form action=''>
            <FormGroup>
            <h5 className="font-weight-bold">Username: </h5>
            <span> </span>
            <input type="text" value={userName} onChange={e => setUserName(e.target.value)}/>
            <br></br>
            </FormGroup>
            <FormGroup>
            <h5 className="font-weight-bold">Password: </h5>
            <span> </span>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <br></br>
            </FormGroup>
            <button className="btn btn-success" onClick={() => props.register(userName,email,password,phoneNumber)}>Submit</button>
        </Form>
    )
}


*/
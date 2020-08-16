import React, { useState, Fragment,useEffect } from 'react'
import { connect } from 'react-redux'
import { register } from '../redux'
import './style/registerContainer.scss'
import NavBar from './NavBar'
import Footer from './Footer'

function RegisterContainer(props) {
    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(() => {
        if(props.status === 400) // get the message name from Michael
        {
            alert("Email, phone or username is used already.")
        }
        else if(props.status === 200 && userName !== ""){
            setUserName("")
            props.history.push("/")
        }
    }, [props])


    return (
        <Fragment>
            <div className="container" id="registerHolder">
                {props.status === 400? <p style={{color:"red"}}>Username, email or phone number user before.</p>: null}
                <h3>Username </h3> <span>  </span>
                <input className="input-group" type="text" value={userName} placeholder="Username" onChange={e => setUserName(e.target.value)} />
                <br></br>
                <h3>Name </h3> <span>  </span>
                <input className="input-group" type="text" value={name} placeholder="Your name" onChange={e => setName(e.target.value)} />
                <br></br>
                <h3>Email </h3> <span>  </span>
                <input className="input-group" type="email" placeholder="example@any.any" value={email} onChange={e => setEmail(e.target.value)} />
                <br></br>
                <h3>Password </h3> <span>  </span>
                <input className="input-group" type="password" value={password} placeholder="******" onChange={e => setPassword(e.target.value)} />
                <br></br>
                <h3>Confirm Password </h3> <span>  </span>
                <input className="input-group" type="password" value={password2} placeholder="******" onChange={e => setPassword2(e.target.value)} />
                <br></br>
                <h3>Phone Number </h3> <span>  </span>
                <input className="input-group" type="number" placeholder="+01" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                <br></br>
                <div id="registerButton" className="text-center">
                    <button className="btn btn-success" onClick={() =>{
                        if (password.length <= 5)
                            alert("Password must be at least 6 characters long.")
                        else if(phoneNumber.length !== 11)
                            alert("Please enter a correct phone number.")
                        
                        else if (password !== password2)
                        {
                            alert("Please write the same password in the 2 fields.")
                        }
                        else
                        {
                            props.register(userName, email, password, phoneNumber,name)
                        }
                    }}>Submit</button>
                </div>
            </div>
        </Fragment>
    )
}


const mapStateToProps = state => {
    return {
        status:state.register.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (userName, email, password, phoneNumber, name) => dispatch(register(userName, email, password, phoneNumber, name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)

// FOR BOOTSTRAP PURPOSES (HAS ISSUES)
/*
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {register} from '../redux'

import { Button, Form, FormGroup, Label,Input } from 'react-bootstrap'

function RegisterContainer(props){
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")

    return (
        <Form action=''>
            <FormGroup>
            <h5 className="font-weight-bold">Username: </h5>
            <span> </span>
            <input type="text" value={userName} onChange={e => setUserName(e.target.value)}/>
            <br></br>
            </FormGroup>
            <FormGroup>
            <h5 className="font-weight-bold">Email: </h5>
            <span> </span>
            <input type="email" placeholder="example@any.any" value={email} onChange={e => setEmail(e.target.value)}/>
            <br></br>
            </FormGroup>
            <FormGroup>
            <h5 className="font-weight-bold">Password: </h5>
            <span> </span>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <br></br>
            </FormGroup>
            <FormGroup>
            <h5 className="font-weight-bold">Phone Number: </h5>
            <span> </span>
            <input type="number" placeholder="+01" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
            <br></br>
            </FormGroup>
            <button className="btn btn-success" onClick={() => props.register(userName,email,password,phoneNumber)}>Submit</button>
        </Form>
    )
}


const mapStateToProps = state => {
    return {
        userName: state.register.userName,
        email: state.register.phoneNumber,
        password: state.register.password,
        phoneNumber: state.register.phoneNumber
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (userName,email,password,phoneNumber) => dispatch(register(userName,email,password,phoneNumber))
    }
}

export default connect(mapStateToProps,mapDispatchToProps,)(RegisterContainer)
*/
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { login } from '../redux'
import './style/loginContainer.scss'

function LoginContainer(props) {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    // const [loginStatus, setLoginStatus] = useState("")

    useEffect(() => {
        if (props.status === 200 && userName !== "") {
            localStorage.setItem("token", props.token)
            localStorage.setItem("userName", props.userName)
            localStorage.setItem("email", props.email)
            localStorage.setItem("phoneNumber", props.phoneNumber)
            localStorage.setItem("name", props.name)
            localStorage.setItem("rate", props.rate)
            props.close()
            setUserName("")

            //props.history.push('/user/profile')
        }
    }, [props])

    return (
        localStorage.getItem("token") === "" || localStorage.getItem("token") === null ?
            <div className="userLoginContainer">
                {props.status === 404 && props.status !== null ? <p style={{ color: "red" }}>Wrong username or password</p> : null}
                {props.status === 403 && props.status !== null ? <p style={{ color: "red" }}>User banned</p> : null}
                {props.status === 401 && props.status !== null ? <p style={{ color: "red" }}>Please confirm your email</p> : null}
                <input className="input-group" type="text" value={userName} placeholder="Username" onChange={e => setUserName(e.target.value)} />
                <input className="input-group" type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <button
                    className="userLoginButton"
                    onClick={() => {
                        if (userName === "" || password === "")
                            alert("Username and password need to be entered.")
                        else{
                            props.login(userName, password)
                        }
                    }}>
                    log In
                </button>
            </div>
            : null
    )
}


const mapStateToProps = state => {
    return {
        status: state.login.status,

        userName: state.login.userName,
        phoneNumber: state.login.phoneNumber,
        email: state.login.email,
        rate: state.login.rate,
        name: state.login.name,
        token: state.login.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (userName, password) => dispatch(login(userName, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
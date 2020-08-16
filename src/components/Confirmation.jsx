import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {confirmEmail} from "../redux"
function Confirmation(props) {

    useEffect(() => {
        var userInfo = window.location.pathname
        userInfo = userInfo.split("/")
        props.confirmEmail(userInfo[3],userInfo[4])
        const timer = setTimeout(() => redirectToMain(props),3000)
        return () => clearTimeout(timer)
    }, [props])

    

    return (
    <div className="text-center">
        <h3>Email Confirmed</h3>
        <h5>redirecting to main page...</h5>
    </div>
    )
}
const redirectToMain = (props) => {
    props.history.push("/")
}


const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        confirmEmail: (userId,generatedToken) => dispatch(confirmEmail(userId,generatedToken))
    }
}

export default connect(mapStateToProps,mapDispatchToProps,)(Confirmation)

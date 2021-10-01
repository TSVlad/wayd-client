import {Button, Form, InputGroup} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {setShowUnsuccessfulLoginAlertAction, setUserAction} from "../../store/actionCreators/actionCreators";
import {connect} from "react-redux";
import clientRequest from "../../utills/clientRequest";
import {useState} from "react";


const Login = (props) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const showAlertForSeconds = (sec) => {
        props.setShowUnsuccessfulLoginAlertDispatch(true)
        setTimeout(() => {
            props.setShowUnsuccessfulLoginAlertDispatch(false)
        }, sec * 1000)
    }

    const onLogin = () => {
        clientRequest('/user/login', 'POST', {username: username, password: password},)
            .then(response => {
                if (response.status === 200) {
                    response.text().then(token => {
                        const tokenArray = token.split('.')
                        const payload = JSON.parse(atob(tokenArray[1]))
                        props.setUserDispatch({username: payload.username, roles: payload.roles})
                        localStorage.setItem('token', token)
                    })
                } else if (response.status === 401) {
                    showAlertForSeconds(5)
                }
            })
    }

    return (
        <InputGroup id="login-form" size="small">
            <Form.Control id="username-login-input" className="col-xs-2" type="text" size="sm" placeholder="Username"
                          onChange={(event) => setUsername(event.target.value)}/>
            <Form.Control id="password-login-input" type="password" size="sm" placeholder="Password"
                          onChange={(event) => setPassword(event.target.value)}/>
            <Button variant="light" onClick={onLogin}>Login</Button>

        </InputGroup>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setUserDispatch: setUserAction,
        setShowUnsuccessfulLoginAlertDispatch: setShowUnsuccessfulLoginAlertAction},
        dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
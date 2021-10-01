import {Button, Form, InputGroup} from "react-bootstrap";
import {bindActionCreators} from "redux";
import setUserAction from "../../store/actionCreators/actionCreators";
import {connect} from "react-redux";
import clientRequest from "../../utills/clientRequest";
import {useState} from "react";


const Login = (props) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const onLogin = () => {
        clientRequest('/user/login', 'POST', {username: username, password: password}, )
            .then(response => response.text())
            .then(token => {
                const tokenArray = token.split('.')
                const payload = JSON.parse(atob(tokenArray[1]))
                props.setUserDispatch({username: payload.username})
                localStorage.setItem('token', token)
            })
    }

    return (
        <InputGroup size="small">
            <Form.Control type="text" size="sm" placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
            <Form.Control type="password" size="sm" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
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
    return bindActionCreators({setUserDispatch: setUserAction}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
import {bindActionCreators} from "redux";
import {setShowUnsuccessfulLoginAlertAction, setUserAction} from "../../store/actionCreators/actionCreators";
import {connect} from "react-redux";
import clientRequest from "../../utills/clientRequest";
import {useState} from "react";
import PATHS from "../../utills/servicesPaths";
import {setCookie} from "../../utills/cookies";


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
        clientRequest(`${PATHS.userServiceAPI}/auth/login`, 'POST', {username: username, password: password},)
            .then(response => {
                if (response.status === 200) {
                    response.text().then(token => {
                        if (token.startsWith("Bearer ")) {
                            const tokenArray = token.substring(7).split('.')
                            const payload = JSON.parse(atob(tokenArray[1]))
                            props.setUserDispatch({username: payload.username, roles: payload.roles})
                            setCookie('wayd-token', token, new Date(payload.expiredAt))
                        }
                    })
                } else if (response.status === 401) {
                    showAlertForSeconds(5)
                }
            })
    }

    return (
        <div className="nav-item dropdown">
            <a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle mr-4">Login</a>
            <div className="dropdown-menu action-form">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username"
                               required="required"
                               onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password"
                               required="required"
                               onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <input className="btn btn-primary btn-block" value="Login" onClick={onLogin}/>
                    <div className="text-center mt-2">
                        <a href="#">Forgot Your password?</a>
                    </div>
            </div>
        </div>
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
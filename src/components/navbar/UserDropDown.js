import {NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setUserAction} from "../../store/actionCreators/actionCreators";
import {deleteCookie} from "../../utills/cookies";

const UserDropDown = (props) => {

    const onLogout = () => {
        deleteCookie('token')
        props.setUserDispatch(null)
    }

    return (

        <NavDropdown
            id="nav-dropdown-dark-example"
            title={<span className="text-white">{props.user.username}</span>}
            menuVariant="dark"
        >
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="/" onClick={onLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
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
        },
        dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDropDown)
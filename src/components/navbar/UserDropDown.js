import {NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setUserAction} from "../../store/actionCreators/actionCreators";
import {useKeycloak} from "@react-keycloak/web";
import {deleteCookie} from "../../utills/cookies";

const UserDropDown = (props) => {

    const {keycloak} = useKeycloak();

    const onLogout = () => {
        deleteCookie('wayd-token')
        props.setUserDispatch(null)
        keycloak.logout({
            redirectUri: window.location.origin
        })
    }

    return (

        <NavDropdown
            id="nav-dropdown-dark-example"
            title={<span className="text-white">{props.user.name}</span>}
            menuVariant="dark"
        >
            <NavDropdown.Item href={`/user/${props.user.sub}`}>Profile</NavDropdown.Item>
            <NavDropdown.Item href={`/settings`}>Settings</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
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
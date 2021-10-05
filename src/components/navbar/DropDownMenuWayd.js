import {NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";

const DropDownMenuWayd = (props) => {

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
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(DropDownMenuWayd)
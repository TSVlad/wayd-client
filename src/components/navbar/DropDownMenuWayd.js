import {ButtonGroup, DropdownButton, Dropdown, NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";

const DropDownMenuWayd = (props) => {

    return (
        /*<DropdownButton
            as={ButtonGroup}
            title={props.user.username + '  qwertqry'}

        >
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
                Active Item
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
        </DropdownButton>*/

        <NavDropdown
            id="nav-dropdown-dark-example"
            title={<span className="text-white">{props.user.username}</span>}
            menuVariant="dark"
        >
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
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
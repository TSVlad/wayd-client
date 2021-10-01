import {Button, Container, Form, InputGroup, Nav, Navbar} from "react-bootstrap";
import {connect} from "react-redux";
import Login from "./Login";

const NavbarWayd = (props) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="https://react-bootstrap.github.io/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Wayd
                </Navbar.Brand>

                <Navbar.Collapse className="justify-content-end">
                    {!props.user &&
                        <Login/>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(NavbarWayd)
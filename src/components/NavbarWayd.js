import {Container, Navbar} from "react-bootstrap";

const NavbarWayd = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="https://react-bootstrap.github.io/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Wayd
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default NavbarWayd
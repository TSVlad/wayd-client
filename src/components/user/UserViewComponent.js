import {Button, Col, Image, Row} from "react-bootstrap";
import LINKS from "../../utills/constants/links";

const UserViewComponent = (props) => {
    return (
        <div className={props.className}>
            <Row>
                <Col sm={4}>
                    <div className="avatar-div mr-1" style={{display: "inline-block"}}>
                        <Image src={props.user.avatar ? props.user.avatar : LINKS.defaultAvatarLink} className="avatar"/>
                    </div>
                </Col>
                <Col>
                    <div>123</div>
                </Col>
            </Row>


        </div>
    )
}

export default UserViewComponent
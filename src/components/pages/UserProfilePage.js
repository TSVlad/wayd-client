import {Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import UserComponent from "../user/UserComponent";
import {getUserByIdRequest} from "../../utills/request/requests/userRequests";
import {useKeycloak} from "@react-keycloak/web";

const UserProfilePage = () => {
    const {userId} = useParams()
    const {initialized} = useKeycloak()

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (userId && initialized) {
            getUserByIdRequest(userId)
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        throw response
                    }
                })
                .then(u => {
                    setUser(u)
                })
        }
    }, [userId, initialized])

    return (
        <Row>
            <Col sm={3}/>
            <Col>
                {!!user &&
                    <UserComponent user={user} className={'mt-3'}/>
                }
            </Col>
            <Col sm={3}/>
        </Row>
    )
}

export default UserProfilePage
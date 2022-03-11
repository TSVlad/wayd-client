import {Button, Col, Row} from "react-bootstrap";
import ComplaintsModerationComponent from "../moderation/ComplaintsModerationComponent";
import {useState} from "react";
import {
    getCurrentSessionRequest,
    startSessionRequest,
    stopSessionRequest
} from "../../utills/request/requests/moderationRequest";

const ModerationPage = () => {

    const [session, setSession] = useState(false)

    useState(() => {
        getCurrentSessionRequest()
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw response
                }
            })
            .then(s => {
                setSession(s)
            })
    }, [])

    return (
        <Row>
            <Col sm={3}/>
            <Col>

                <Row className={'mt-3 justify-content-center'}>
                    {!session &&
                        <Button className={'w-50'} onClick={() => {
                            startSessionRequest()
                                .then(response => {
                                    if (response.status === 200) {
                                        return response.json()
                                    } else {
                                        throw response
                                    }
                                })
                                .then(s => {
                                    setSession(s)
                                })
                        }
                        }>Start moderation session</Button>
                    }
                    {session &&
                        <Button className={'w-50'} variant={'secondary'} onClick={() => {
                            stopSessionRequest()
                                .then(response => {
                                    if (response.status === 200) {
                                        setSession(null)
                                    } else {
                                        throw response
                                    }
                                })
                        }
                        }>Stop moderation session</Button>
                    }
                </Row>
                <ComplaintsModerationComponent className={'m-3'}/>
            </Col>
            <Col sm={3}/>
        </Row>
    )
}

export default ModerationPage
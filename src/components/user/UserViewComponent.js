import {Button, Col, Dropdown, Image, Row} from "react-bootstrap";
import LINKS from "../../utills/constants/links";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {getSubscriptionsRequest, subscribeRequest, unsubscribeRequest} from "../../utills/request/requests/notificationRequests";
import {getImageUrlByIdRequest} from "../../utills/request/requests/requests";
import ComplaintModalComponent from "../moderation/ComplaintModalComponent";
import {banUserRequest, complainRequest} from "../../utills/request/requests/moderationRequest";
import ROLES from "../../utills/constants/roles";
import BanModalComponent from "../moderation/BanModalComponent";

const UserViewComponent = (props) => {

    const [subscriptions, setSubscriptions] = useState([])
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showBan, setShowBan] = useState(false)

    useEffect(() => {
        getSubscriptionsRequest()
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw response
                }
            })
            .then(subs => {
                console.log(subs)
                setSubscriptions(subs)
            })
    }, [])

    useEffect(() => {
        if (props.user) {
            if (props.user.avatar) {
                getImageUrlByIdRequest(props.user.avatar, true)
                    .then(response => {
                        if (response.status === 200) {
                            return response.json()
                        } else {
                            throw response
                        }
                    })
                    .then(dto => {
                        setAvatarUrl(dto.url)
                    })
            }
        }
    }, [props])

    return (
        <div className={props.className}>
            <Row>
                <Col sm={4}>
                    <div className="avatar-div mr-1" style={{display: "inline-block"}}>
                        <Image src={props.user.avatar && avatarUrl ? avatarUrl : LINKS.defaultAvatarLink}
                               className="avatar"/>
                    </div>
                </Col>
                <Col>

                    <Row>
                        <Col sm={9}>
                            <h2>{props.user.name} {props.user.surname}</h2>
                        </Col>
                        <Col>

                            <Dropdown className={'d-inline float-end'}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Actions
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                {props.authenticatedUser && props.user.id === props.authenticatedUser.sub && (
                                        <Dropdown.Item href={`/user/${props.user.id}/edit`}>Edit</Dropdown.Item>
                                )}
                                {props.authenticatedUser && props.user.id !== props.authenticatedUser.sub && (
                                        <Dropdown.Item onClick={() => {
                                            setShowModal(true)
                                        }}>Complain</Dropdown.Item>
                                )}
                                {props.user.id !== props.authenticatedUser.sub
                                    && props.authenticatedUser.realm_access.roles.includes(ROLES.MODERATOR) && (
                                        <Dropdown.Item onClick={() => {
                                            setShowBan(true)
                                        }}>Block</Dropdown.Item>
                                    )
                                }
                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>
                    </Row>


                    <p><b>{props.user.username}</b></p>
                    {props.user.dateOfBirth &&
                        <p>Date of birth: {props.user.dateOfBirth}</p>
                    }
                    {props.user.contacts &&
                        <p>Contacts: {props.user.contacts}</p>
                    }
                    {props.authenticatedUser && props.user.id !== props.authenticatedUser.sub && !subscriptions.includes(props.user.id) &&
                        <Button onClick={() => {
                            subscribeRequest(props.user.id)
                                .then(response => {
                                    if (response.status === 200) {
                                        setSubscriptions([...subscriptions, props.user.id])
                                    }
                                })
                        }
                        }>
                            Subscribe
                        </Button>
                    }
                    {subscriptions.includes(props.user.id) &&
                        <Button variant={'secondary'} onClick={() => {
                            unsubscribeRequest(props.user.id)
                                .then(response => {
                                    if (response.status === 200) {
                                        setSubscriptions(subscriptions.filter(id => id !== props.user.id))
                                    }
                                })
                        }
                        }>
                            Unsubscribe
                        </Button>
                    }
                </Col>
            </Row>
            {props.user.description &&
                <div className={'mt-3'}>
                    <h3>Profile description</h3>
                    <p>{props.user.description}</p>
                </div>
            }

            <ComplaintModalComponent show={showModal} onHide={() => setShowModal(false)} onComplain={complaint => {
                complainRequest({...complaint, type: 'COMPLAINT_USER', objectId: props.user.id})
                setShowModal(false)
            }}/>

            <BanModalComponent show={showBan} onHide={() => setShowBan(false)} onBan={ban => {
                banUserRequest({...ban, userId: props.user.id})
                setShowBan(false)
            }}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authenticatedUser: state.user
    }
}

export default connect(mapStateToProps)(UserViewComponent)
import {Button, Col, Dropdown, Image, Row} from "react-bootstrap";
import LINKS from "../../utills/constants/links";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {getSubscriptions, subscribe, unsubscribe} from "../../utills/request/requests/notificationRequests";

const UserViewComponent = (props) => {

    const [subscriptions, setSubscriptions] = useState([])

    useEffect(() => {
        getSubscriptions()
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

    return (
        <div className={props.className}>
            <Row>
                <Col sm={4}>
                    <div className="avatar-div mr-1" style={{display: "inline-block"}}>
                        <Image src={props.user.avatar ? props.user.avatar : LINKS.defaultAvatarLink}
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
                                {props.user.id === props.authenticatedUser.sub && (
                                    <Dropdown.Menu>
                                        <Dropdown.Item href={`/user/${props.user.id}/edit`}>Edit</Dropdown.Item>
                                    </Dropdown.Menu>
                                )}
                            </Dropdown>

                        </Col>
                    </Row>


                    <p><b>{props.user.username}</b></p>
                    <p>Date of birth: {props.user.dateOfBirth}</p>
                    {props.user.contacts &&
                        <p>Contacts: {props.user.contacts}</p>
                    }
                    {props.user.id !== props.authenticatedUser.sub && !subscriptions.includes(props.user.id) &&
                        <Button onClick={() => {
                            subscribe(props.user.id)
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
                            unsubscribe(props.user.id)
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authenticatedUser: state.user
    }
}

export default connect(mapStateToProps)(UserViewComponent)
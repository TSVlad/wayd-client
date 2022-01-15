import {Button, Carousel, Col, Dropdown, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getImageUrlsByIdsRequest} from "../../utills/request/requests/requests";
import '../../css/image.css'
import SmallMapComponent from "../map/SmallMapComponent";
import {connect} from "react-redux";
import {cancelParticipationRequest, participateRequest} from "../../utills/request/requests/eventRequests";
import {isoToLocalDateTime, isoToLocalDateTimeForShow} from "../../utills/dates";

const EventViewComponent = (props) => {
    const [picturesUrls, setPicturesUrls] = useState([])
    const [event, setEvent] = useState(props.event)

    useEffect(() => {
        setEvent(props.event)
        getImageUrlsByIdsRequest(props.event.picturesRefs, false)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw response
                }
            })
            .then(urls => {
                setPicturesUrls(urls)
            })
    }, [props.event])

    return (
        <div>
            <h2 className={"mt-3"}>{event.name}
                {event && event.id && props.user.id === event.ownerId && (
                    <Dropdown className={'d-inline float-end'}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Actions
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href={`/event/edit/${event.id}`}>Edit</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </h2>
            <Carousel variant={"dark"} interval={3000} style={{height: '30vh', width: '100%'}} className={'mt-3'}>
                {picturesUrls.map(url => (
                    <Carousel.Item key={url}>
                        <img
                            className="d-block event-page-carousel-image"
                            src={url}
                            alt={'Event'}
                        />
                    </Carousel.Item>

                ))}
            </Carousel>

            <Row className={'mt-1'}>
                <Col sm={8}>
                    <div>
                        <h3>Description</h3>
                        {event.description}
                    </div>

                    <div>
                        <h3>Contacts</h3>
                        {event.contacts}
                    </div>

                    <div>
                        <h3>Location</h3>
                        <SmallMapComponent editMode={false}
                                           markerPosition={event && event.point ? event.point.coordinates : undefined}/>
                    </div>
                </Col>


                <Col>
                    <div>
                        {props.user && props.user.id === event.ownerId}
                        <p>Status: {event.status}</p>
                        <p>Date and time: {isoToLocalDateTimeForShow(event.dateTime)}</p>
                        <p>Participants: {event.participantsIds && event.participantsIds.length}</p>
                        {(event.minAge > 0 || event.maxAge > 0 || event.minNumberOfParticipants > 0 || event.maxNumberOfParticipants > 0) && (
                            <>
                                <h5>Requirements</h5>
                                {(event.minAge > 0 || event.maxAge > 0) &&
                                    (
                                        <p>Age: {event.minAge} {event.maxAge ? '-' : '+'} {event.maxAge > 0 ? event.maxAge : ''}</p>)
                                }
                                {(event.minNumberOfParticipants > 0 || event.maxNumberOfParticipants > 0) && (
                                    <p>Participants
                                        number: {event.minNumberOfParticipants > 0 && event.maxNumberOfParticipants <= 0 ? '>' : ''} {event.minNumberOfParticipants > 0 ? event.minNumberOfParticipants : ''} {event.minNumberOfParticipants > 0 && event.maxNumberOfParticipants > 0  ? '-' : ''} {event.minNumberOfParticipants <= 0 && event.maxNumberOfParticipants > 0 ? '<' : ''} {event.maxNumberOfParticipants > 0 ? event.maxNumberOfParticipants : ''}</p>
                                )}
                                {event && event.deadline && (
                                    <p>Deadline: {isoToLocalDateTimeForShow(event.deadline)}</p>)}
                            </>
                        )}
                        {props.user && event && event.participantsIds && !event.participantsIds.includes(props.user.id) && (
                            <Button className={'w-100'} onClick={() => {
                                participateRequest(event.id)
                                    .then(response => {
                                        if (response.status === 200) {
                                            return response.json()
                                        } else {
                                            throw response
                                        }
                                    })
                                    .then(updatedEvent => {
                                        setEvent(updatedEvent)
                                    })
                            }}>Participate</Button>
                        )}
                        {props.user && event && event.participantsIds && event.participantsIds.includes(props.user.id) && (
                            <Button variant={'secondary'} className={'w-100'} onClick={() => {
                                cancelParticipationRequest(event.id)
                                    .then(response => {
                                        if (response.status === 200) {
                                            return response.json()
                                        } else {
                                            throw response
                                        }
                                    })
                                    .then(updatedEvent => {
                                        setEvent(updatedEvent)
                                    })
                            }}>Cancel participation</Button>
                        )}
                    </div>
                </Col>
            </Row>


        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(EventViewComponent)
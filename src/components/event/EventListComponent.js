import EventListItemComponent from "./EventListItemComponent";
import {useEffect, useState} from "react";
import {getEventToImageMap} from "../../utills/images";

const EventListComponent = (props) => {
    const [eventToImageMap, setEventToImageMap] = useState({})

    useEffect(() => {
        getEventToImageMap(props.events)
            .then(eventToImageMap => {
                setEventToImageMap(eventToImageMap)
            })
    }, [props.events])

    return (
        <div style={props.style}>
            {props.events && props.events.map(event => (
                <EventListItemComponent className={'mt-3'} key={event.id} event={event} imageUrl={eventToImageMap[event.picturesRefs[0]]}/>
            ))}
        </div>
    )
}

export default EventListComponent
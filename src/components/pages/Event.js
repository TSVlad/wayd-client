import {useParams} from "react-router-dom";

const Event = () => {
    const {eventId} = useParams()

    return(
        <div content={eventId}/>
    )
}

export default Event
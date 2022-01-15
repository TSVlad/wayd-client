import clientRequest from "../clientRequest";
import PATHS from "../../servicesPaths";

const getEventByIdRequest = (id) => {
    return clientRequest(`${PATHS.eventServiceAPI}/event/${id}`)
}

const participateRequest = (eventId) => {
    return clientRequest(`${PATHS.eventServiceAPI}/event/participate/${eventId}`, 'POST')
}

const cancelParticipationRequest = (eventId) => {
    return clientRequest(`${PATHS.eventServiceAPI}/event/participate/${eventId}/cancel`, 'POST')
}

export {getEventByIdRequest, participateRequest, cancelParticipationRequest}
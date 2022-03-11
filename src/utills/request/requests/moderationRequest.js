import clientRequest from "../clientRequest";
import PATHS from "../../constants/servicesPaths";

const getReasonsRequest = () => {
    return clientRequest(`${PATHS.moderationServiceAPI}/reason`)
}

const complainRequest = (complaint) => {
    return clientRequest(`${PATHS.moderationServiceAPI}/complaint`, 'POST', complaint)
}

const banUserRequest = (banInfo) => {
    return clientRequest(`${PATHS.moderationServiceAPI}/ban`, 'POST', banInfo)
}

const blockRequest = (blockInfo) => {
    return clientRequest(`${PATHS.moderationServiceAPI}/blocks`, 'POST', blockInfo)
}

const getCurrentSessionRequest = () => {
    return clientRequest(`${PATHS.moderationServiceAPI}/session/current`)
}

const startSessionRequest = () => {
    return clientRequest(`${PATHS.moderationServiceAPI}/session/start`, 'POST')
}

const stopSessionRequest = () => {
    return clientRequest(`${PATHS.moderationServiceAPI}/session/close`, 'POST')
}

export {getReasonsRequest, complainRequest, banUserRequest, blockRequest, getCurrentSessionRequest, startSessionRequest,
    stopSessionRequest}
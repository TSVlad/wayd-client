import clientRequest from "../clientRequest";
import PATHS from "../../constants/servicesPaths";

const getReasonsRequest = () => {
    return clientRequest(`${PATHS.moderationServiceAPI}/reason`)
}

const complainRequest = (complaint) => {
    return clientRequest(`${PATHS.moderationServiceAPI}/complaint`, 'POST', complaint)
}

export {getReasonsRequest, complainRequest}
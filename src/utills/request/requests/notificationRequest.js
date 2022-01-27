import clientRequest from "../clientRequest";
import PATHS from "../../constants/servicesPaths";


const getNotificationsByStatusesRequest = (statuses) => {
    let uri = `${PATHS.notificationServiceAPI}/notification?`
    for (const status of statuses) {
        uri += `status=${status}&`
    }
    return clientRequest(uri)
}

const updateNotificationStatus = (id, status) => {
    return clientRequest(`${PATHS.notificationServiceAPI}/notification/${id}/update-status`, 'POST', status)
}

export {getNotificationsByStatusesRequest, updateNotificationStatus}
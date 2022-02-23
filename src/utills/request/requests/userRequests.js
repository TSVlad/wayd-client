import clientRequest from "../clientRequest";
import PATHS from "../../constants/servicesPaths";

const getUserByIdRequest = (id) => {
    return clientRequest(`${PATHS.userServiceAPI}/user/${id}`)
}

const updateUserRequest = (userInfo) => {
    return clientRequest(`${PATHS.userServiceAPI}/user`, 'PUT', userInfo)
}

const registerRequest = (userInfo) => {
    return clientRequest(`${PATHS.userServiceAPI}/user/register`, 'POST', userInfo)
}

const getUsersByIdsRequest = (ids) => {
    return clientRequest(`${PATHS.userServiceAPI}/user/by-ids`, 'POST', ids)
}

export {getUserByIdRequest, updateUserRequest, registerRequest, getUsersByIdsRequest}
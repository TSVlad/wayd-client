import clientRequest from "../clientRequest";
import PATHS from "../../constants/servicesPaths";

const getUserByIdRequest = (id) => {
    return clientRequest(`${PATHS.userServiceAPI}/user/${id}`)
}

export {getUserByIdRequest}
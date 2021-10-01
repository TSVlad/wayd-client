import SET_USER_ACTION from "../actions/actionTypes";

const setUserAction = (user) => {
    return {
        type: SET_USER_ACTION,
        user
    }
}

export default setUserAction
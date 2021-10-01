import SET_USER_ACTION from "../actions/actionTypes";

const reducer = (state, action) => {
    console.log(action)
    switch(action.type) {
        case SET_USER_ACTION: return {...state, user: action.user}
        default: return state;
    }
}

export default reducer
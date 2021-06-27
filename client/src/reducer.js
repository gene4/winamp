export default function reducers(state = {}, action) {
    let newState = {};

    if (action.type == "UPDATE_TRACKS") {
        newState = {
            ...state,
            tracks: action.payload,
        };
    } else if (action.type == "UPDATE_CURRENT_TRACKS") {
        newState = {
            ...state,
            index: action.index,
            trackId: action.trackId,
            user: action.user,
            title: action.title,
            duration: action.duration,
            artwork_url: action.artwork_url,
            permalink_url: action.permalink_url,
        };
    } else if (action.type == "SET_USER_ID") {
        newState = {
            ...state,
            userId: action.payload,
        };
    } else if (action.type == "SET_PLAYER") {
        newState = {
            ...state,
            player: action.payload,
        };
    } else if (action.type == "SET_LIST_ELEMENTS") {
        newState = {
            ...state,
            listElements: action.payload,
        };
    }

    return newState;
}

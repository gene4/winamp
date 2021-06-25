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
        };
    }

    return newState;
}

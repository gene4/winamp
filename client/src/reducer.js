export default function reducers(state = {}, action) {
    let newState = {
        isPlaylist: false,
        isScreen: false,
        isShare: false,
    };

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
            artwork_url: action.artwork_url || "../cat.png",
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
    } else if (action.type == "SET_TIMER") {
        newState = {
            ...state,
            trackTime: action.payload,
        };
    } else if (action.type == "SET_SHARE") {
        newState = {
            ...state,
            isShare: action.payload,
        };
    } else if (action.type == "SET_LIST_ELEMENTS") {
        newState = {
            ...state,
            listElements: action.payload,
        };
    } else if (action.type == "TOGGLE_PLAYLIST") {
        newState = {
            ...state,
            isPlaylist: action.payload,
        };
    } else if (action.type == "SET_SCREEN") {
        newState = {
            ...state,
            isScreen: action.payload,
        };
    } else if (action.type == "GET_PLAYLIST") {
        newState = {
            ...state,
            playlist: action.payload,
        };
    } else if (action.type == "INSERT_TRACK") {
        newState = {
            ...state,
        };
    } else if (action.type == "DELETE_TRACK") {
        newState = {
            ...state,
            playlist: state.playlist.filter((track) => {
                console.log("trackid", track);
                if (track.track_id != action.payload) {
                    return {
                        ...track,
                    };
                }
            }),
        };
    }
    return newState;
}

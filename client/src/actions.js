export const setUserId = async (userId) => {
    return {
        type: "SET_USER_ID",
        payload: userId,
    };
};

export const setPlayer = async (player) => {
    return {
        type: "SET_PLAYER",
        payload: player,
    };
};

export const updateTracks = async (tracks) => {
    return {
        type: "UPDATE_TRACKS",
        payload: tracks,
    };
};

export const updateCurrentTrack = async (
    index,
    trackId,
    user,
    title,
    duration,
    artwork_url,
    permalink_url
) => {
    return {
        type: "UPDATE_CURRENT_TRACKS",
        index: index,
        trackId: trackId,
        user: user,
        title: title,
        duration: duration,
        artwork_url: artwork_url,
        permalink_url: permalink_url,
    };
};

export const setListElements = async (listElements) => {
    return {
        type: "SET_LIST_ELEMENTS",
        payload: listElements,
    };
};

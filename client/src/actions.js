import axios from "./axios";

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
    permalink_url,
    userId
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
        userId: userId,
    };
};

export const setListElements = async (listElements) => {
    return {
        type: "SET_LIST_ELEMENTS",
        payload: listElements,
    };
};

export const setTimer = async (trackTime) => {
    return {
        type: "SET_TIMER",
        payload: trackTime,
    };
};

export const togglePlaylist = async (isPlaylist) => {
    isPlaylist = !isPlaylist;

    return {
        type: "TOGGLE_PLAYLIST",
        payload: isPlaylist,
    };
};

export const setIsScreen = async (isScreen) => {
    isScreen = !isScreen;

    return {
        type: "SET_SCREEN",
        payload: isScreen,
    };
};

export const setShare = async (isShare) => {
    isShare = !isShare;

    return {
        type: "SET_SHARE",
        payload: isShare,
    };
};

export const getPlaylist = async (userId) => {
    try {
        const playlist = await axios.get(`/playlist/${userId}`);

        if (playlist) {
            return {
                type: "GET_PLAYLIST",
                payload: playlist.data,
            };
        } else {
            return {
                payload: {},
            };
        }
    } catch (error) {
        console.log("error in axios to playlist", error);
    }
};

export const insertTrack = async (trackData) => {
    try {
        const { data } = await axios.post(`/insert/track`, trackData);
        console.log("data from insert post", data);
        if (data.success) {
            return {
                type: "INSERT_TRACK",
                payload: data,
            };
        }
    } catch (error) {
        console.log("error in inserting posts", error);
    }
};

export const deleteTrack = async (trackId) => {
    console.log("track data in action", trackId);

    try {
        const { data } = await axios.post(`/delete/track`, {
            trackId: trackId,
        });
        console.log("data from insert post", data);
        if (data.success) {
            return {
                type: "DELETE_TRACK",
                payload: trackId,
            };
        }
    } catch (error) {
        console.log("error in inserting posts", error);
    }
};

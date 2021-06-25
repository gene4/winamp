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
    duration
) => {
    return {
        type: "UPDATE_CURRENT_TRACKS",
        index: index,
        trackId: trackId,
        user: user,
        title: title,
        duration: duration,
    };
};
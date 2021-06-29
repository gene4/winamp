import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlaylist, updateCurrentTrack, setListElements } from "./actions";

export default function Playlist() {
    const playlist = useSelector((state) => state.playlist);
    const userId = useSelector((state) => state.userId);
    const listElements = useSelector((state) => state.listElements);

    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            dispatch(getPlaylist(userId));
        }
        dispatch(setListElements(document.getElementsByClassName("track")));
    }, []);

    const millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };

    const setBeckground = (index) => {
        if (listElements) {
            for (let i = 0; i < listElements.length; i++) {
                const element = listElements[i];
                element.classList.remove("blue");
            }

            listElements[index].classList.add("blue");
        }
    };

    return (
        <div className="playlist">
            <div>
                <p>My Playlist!</p>
            </div>
            <ol className="tracks">
                {playlist &&
                    playlist.map((track, index) => (
                        <li
                            className="track"
                            onClick={() => {
                                dispatch(
                                    updateCurrentTrack(
                                        index,
                                        track.track_id,
                                        track.username,
                                        track.title,
                                        track.duration,
                                        track.artwork_url,
                                        track.permalink_url
                                    )
                                );
                                setBeckground(index);
                            }}
                            key={index}
                        >
                            {track.username} - {track.title}{" "}
                            {millisToMinutesAndSeconds(track.duration)}
                        </li>
                    ))}
            </ol>
        </div>
    );
}

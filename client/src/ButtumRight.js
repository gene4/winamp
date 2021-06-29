import { useSelector, useDispatch } from "react-redux";

import { togglePlaylist } from "./actions";

export default function ButtomRight() {
    const isPlaylist = useSelector((state) => state.isPlaylist);
    const trackTime = useSelector((state) => state.trackTime);

    const dispatch = useDispatch();

    const millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (
            (minutes < 10 ? "0" : "") +
            minutes +
            ":" +
            (seconds < 10 ? "0" : "") +
            seconds
        );
    };

    console.log("tracktime", trackTime);

    return (
        <div className="buttom-right">
            <div className="buttom-timer">
                {trackTime > 0 && <p>{millisToMinutesAndSeconds(trackTime)}</p>}
            </div>
            <div
                onClick={() => {
                    dispatch(togglePlaylist(isPlaylist));
                }}
                className="playlist-button"
            ></div>
        </div>
    );
}

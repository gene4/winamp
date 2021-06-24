import { useState, useEffect } from "react";
const secret = require("../../secrets.json").ClientId;
var SC = require("soundcloud");
import { useDispatch } from "react-redux";
import { updateTracks, updateCurrentTrack } from "./actions";

export default function Search() {
    const [tracks, setTracks] = useState();
    const [searchInput, setSearchInput] = useState();
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        SC.initialize({
            client_id: secret,
        });
    }, []);

    useEffect(() => {
        let abort;
        if (searchInput) {
            SC.get("/tracks", {
                q: searchInput,
                limit: 50,
            })
                .then(function (tracks) {
                    console.log("data", tracks);
                    if (!abort) {
                        if (tracks.length == 0) {
                            console.log("elseifblock");
                            // setError(true);
                        } else {
                            // setError(false);
                            setTracks(tracks);
                            dispatch(updateTracks(tracks));
                        }
                    }
                })
                .catch((e) => {
                    setError(true);
                    console.log("cant find tracks", e);
                });
        }

        return () => {
            abort = true;
        };
    }, [searchInput]);

    const millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };

    const playAndTransmit = (trackId, user, title, duration) => {
        // SC.stream(`/tracks/${trackId}`).then(function (player) {
        //     player.play();

        // });
        dispatch(updateCurrentTrack(trackId, user, title, duration));
    };

    return (
        <div className="search">
            <input
                label="Search a track!"
                className="search-input"
                placeholder="Search a track!"
                onChange={(e) => setSearchInput(e.target.value)}
                defaultValue={searchInput}
            ></input>
            <ol className="tracks">
                {tracks &&
                    tracks.map((track, index) => (
                        <li
                            className="track"
                            onClick={() =>
                                playAndTransmit(
                                    index,
                                    track.id,
                                    track.user.username,
                                    track.title,
                                    track.duration
                                )
                            }
                            key={index}
                        >
                            {track.user.username} - {track.title}{" "}
                            {millisToMinutesAndSeconds(track.duration)}
                        </li>
                    ))}
            </ol>
            {error && <h1>No track found!</h1>}
        </div>
    );
}

import { useState, useEffect } from "react";
const secret = require("../../secrets.json").ClientId;
var SC = require("soundcloud");
import { useDispatch, useSelector } from "react-redux";
import { updateTracks, updateCurrentTrack, setListElements } from "./actions";

export default function Search() {
    const [searchInput, setSearchInput] = useState("");
    const [error, setError] = useState(false);

    const listElements = useSelector((state) => state.listElements);
    const tracks = useSelector((state) => state.tracks);

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
                limit: 51,
            })
                .then(function (tracks) {
                    if (!abort) {
                        if (tracks.length == 0) {
                            setError(true);
                        } else {
                            setError(false);
                            dispatch(
                                setListElements(
                                    document.getElementsByClassName("track")
                                )
                            );
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

    const setBeckground = (index) => {
        for (let i = 0; i < listElements.length; i++) {
            const element = listElements[i];
            element.classList.remove("blue");
        }

        listElements[index].classList.add("blue");
    };

    return (
        <div className="search">
            <div>
                <p>Search a track!</p>
                <input
                    className="search-input"
                    onChange={(e) => setSearchInput(e.target.value)}
                    defaultValue={searchInput}
                ></input>
            </div>

            <ol className="tracks">
                {tracks &&
                    tracks.map((track, index) => (
                        <li
                            className="track"
                            onClick={() => {
                                dispatch(
                                    updateCurrentTrack(
                                        index,
                                        track.id,
                                        track.user.username,
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
                            {" "}
                            {track.user.username}- {track.title}{" "}
                            {millisToMinutesAndSeconds(track.duration)}
                        </li>
                    ))}
            </ol>
            {error && <p>No track found! </p>}
        </div>
    );
}

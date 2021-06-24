import { useState, useEffect } from "react";
import axios from "./axios";

export default function Search() {
    const [tracks, setTracks] = useState();
    const [searchInput, setSearchInput] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        let abort;

        if (searchInput) {
            axios
                .get(`https://api.soundcloud.com/tracks?q=${searchInput}`)
                .then(({ data }) => {
                    console.log("data", data);
                    if (!abort) {
                        if (data.length == 0) {
                            console.log("elseifblock");
                            // setError(true);
                        } else {
                            // setError(false);
                            setTracks(data);
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

    console.log("Tracks", tracks);
    return (
        <div className="search">
            <p>Search</p>
            <input
                placeholder="Search a track!"
                onChange={(e) => setSearchInput(e.target.value)}
                defaultValue={searchInput}
            ></input>
        </div>
    );
}

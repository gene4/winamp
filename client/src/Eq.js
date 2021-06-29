import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Share from "./Share";
const secret = require("../../secrets.json").ClientId;
var SC = require("soundcloud");

export default function Eq() {
    const artwork = useSelector((state) => state.artwork_url);
    const trackId = useSelector((state) => state.trackId);
    const user = useSelector((state) => state.user);
    const title = useSelector((state) => state.title);
    const isScreen = useSelector((state) => state.isScreen);
    const isShare = useSelector((state) => state.isShare);
    const permalink_url = useSelector((state) => state.permalink_url);

    const [purchase_url, setPurchase_url] = useState("");
    const [created_at, setcreated_at] = useState();
    const [playback_count, setPlayback_count] = useState();

    useEffect(() => {
        SC.initialize({
            client_id: secret,
        });
    }, []);

    useEffect(() => {
        if (trackId) {
            SC.get(`/tracks/${trackId}`).then(function (track) {
                setPurchase_url(track.purchase_url);

                setPlayback_count(track.playback_count);
                setcreated_at(
                    track.created_at.slice(0, 10).split("/").reverse().join("/")
                );
            });
        }
    }, [trackId]);

    return (
        <div className="middle-container">
            <div className="big-screen">
                {!isScreen && !isShare && (
                    <a href={purchase_url} target="_blank" rel="noreferrer">
                        {" "}
                        {artwork && (
                            <img className="artwork" src={artwork}></img>
                        )}
                    </a>
                )}
                {isScreen && !isShare && (
                    <div className="info">
                        <a href={purchase_url} target="_blank" rel="noreferrer">
                            {" "}
                            {artwork && (
                                <img
                                    width="100"
                                    height="100"
                                    src={artwork}
                                ></img>
                            )}
                        </a>
                        <div>
                            <p>{user}</p>
                            <p>{title}</p>
                            {playback_count && <p>Plays: {playback_count}</p>}
                            <p>{created_at}</p>
                        </div>
                    </div>
                )}

                {isShare && <Share permalink_url={permalink_url} />}
            </div>
        </div>
    );
}

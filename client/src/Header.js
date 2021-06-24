import Animation from "./Animation";
import Ticker from "./Ticker";
import { useSelector } from "react-redux";
const secret = require("../../secrets.json").ClientId;
var SC = require("soundcloud");
import { useEffect, useState } from "react";

export default function Header() {
    const tracks = useSelector((state) => state.tracks);
    const index = useSelector((state) => state.index);
    const trackId = useSelector((state) => state.trackId);
    const user = useSelector((state) => state.user);
    const title = useSelector((state) => state.title);
    const duration = useSelector((state) => state.duration);
    const [player, setPlayer] = useState();

    useEffect(() => {
        SC.initialize({
            client_id: secret,
        });
    }, []);

    useEffect(() => {
        if (trackId) {
            SC.stream(`/tracks/${trackId}`).then(function (player) {
                console.log("player at play", player);
                setPlayer(player);
                player.play();
            });
        }
    }, [trackId]);

    const play = (trackId) => {
        SC.stream(`/tracks/${trackId}`).then(function (player) {
            console.log("player at play", player);
            setPlayer(player);
            player.play();
        });
    };

    const next = (tracks, index) => {
        SC.stream(`/tracks/${tracks[index + 1]}`).then(function (player) {
            console.log("player at play", player);
            setPlayer(player);
            player.play();
        });
    };

    console.log("track in header", trackId, user, title, duration);
    return (
        <div className="header">
            <img className="winamp-bar" src="../winamp.png"></img>
            <div className="top-upper-pannel">
                <Animation />
                <Ticker />
            </div>
            <p className="kbps">192</p>
            <p className="khz">44</p>
            <input
                className="volume-bar"
                title="volume-bar"
                type="range"
                min="0"
                max="100"
                step="1"
            ></input>
            <input
                className="pan-bar"
                title="pan-bar"
                type="range"
                min="0"
                max="100"
                step="1"
            ></input>
            <input
                className="progress-bar"
                title="progress-bar"
                type="range"
                min="0"
                max="100"
                step="1"
            ></input>
            <div className="player-control-panel">
                <div className="previous"></div>
                <div className="play" onClick={() => play(trackId)}></div>
                <div className="pause" onClick={() => player.pause()}></div>
                <div className="stop" onClick={() => player.kill()}></div>
                <div className="next" onClick={() => next(tracks, index)}></div>
                <div className="shuffle"></div>
            </div>
        </div>
    );
}

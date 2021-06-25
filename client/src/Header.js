import Animation from "./Animation";
import Ticker from "./Ticker";
import { useSelector, useDispatch } from "react-redux";
const secret = require("../../secrets.json").ClientId;
var SC = require("soundcloud");
import { useEffect, useState } from "react";
import { updateCurrentTrack } from "./actions";

export default function Header() {
    const tracks = useSelector((state) => state.tracks);
    const index = useSelector((state) => state.index);
    const trackId = useSelector((state) => state.trackId);
    const user = useSelector((state) => state.user);
    const title = useSelector((state) => state.title);
    const duration = useSelector((state) => state.duration);
    let [player, setPlayer] = useState();
    const [trackTime, setTrackTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [panNode, setPanNode] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        SC.initialize({
            client_id: secret,
        });
    }, []);

    useEffect(
        () => {
            if (trackId) {
                SC.stream(`/tracks/${trackId}`).then(function (player) {
                    setPlayer(player);
                    player.play();
                    setIsPlaying(true);
                });
            }
        },
        [trackId],
        [player]
    );

    useEffect(() => {
        if (player && player.isPlaying) {
            const interval = setInterval(function () {
                setTrackTime(player.currentTime());
                if (!player.isPlaying()) {
                    clearInterval(interval);
                }
            }, 100);
        }
    }, [isPlaying]);

    const creatPanNode = () => {
        var audioCtx = new window.AudioContext();
        console.log("audioCtx", audioCtx);
        setPanNode(audioCtx.createStereoPanner());
        // panNode.connect(audioCtx.destination);
        console.log("panNode", panNode);
        panNode.pan.value = -1;
        // if (audioCtx && panNode) {
        //     audioCtx.connect(panNode);
        //
        // }
    };

    const play = (trackId) => {
        if (player.isDead()) {
            SC.stream(`/tracks/${trackId}`).then(function (player) {
                setPlayer(player);
                player.play();
                creatPanNode();
                setIsPlaying(true);
                return;
            });
        }
        player.play();
        console.log("player:", player);
        creatPanNode();
        setIsPlaying(true);
    };

    const next = (tracks, index) => {
        let newTrack = tracks[index + 1];
        SC.stream(`/tracks/${newTrack.id}`).then(function (player) {
            setPlayer(player);
            player.play();
            creatPanNode();
            setIsPlaying(true);
            dispatch(
                updateCurrentTrack(
                    index + 1,
                    newTrack.id,
                    newTrack.user.username,
                    newTrack.title,
                    newTrack.duration
                )
            );
        });
    };

    const previous = (tracks, index) => {
        let newTrack = tracks[index - 1];
        SC.stream(`/tracks/${newTrack.id}`).then(function (player) {
            console.log("player at play", player);
            setPlayer(player);
            player.play();
            creatPanNode();
            setIsPlaying(true);
            dispatch(
                updateCurrentTrack(
                    index - 1,
                    newTrack.id,
                    newTrack.user.username,
                    newTrack.title,
                    newTrack.duration
                )
            );
        });
    };

    const shuffle = (tracks) => {
        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];

        SC.stream(`/tracks/${randomTrack.id}`).then(function (player) {
            setPlayer(player);
            player.play();
            setIsPlaying(true);
            dispatch(
                updateCurrentTrack(
                    tracks.indexOf(randomTrack),
                    randomTrack.id,
                    randomTrack.user.username,
                    randomTrack.title,
                    randomTrack.duration
                )
            );
        });
    };

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
                onChange={(e) => player.setVolume(e.target.value)}
                className="volume-bar"
                title="volume-bar"
                type="range"
                min="0"
                max="1"
                step="0.01"
            ></input>
            <input
                onChange={(e) => {
                    panNode.pan.value = e.target.value;
                    console.log("panNode.pan.value", panNode.pan.value);
                }}
                className="pan-bar"
                title="pan-bar"
                type="range"
                min="-1"
                max="1"
                step="0.01"
                defaultValue="0"
            ></input>
            <input
                onChange={(e) => player.seek(e.target.value)}
                className="progress-bar"
                title="progress-bar"
                type="range"
                min="0"
                max={`${duration}`}
                step={`${duration / duration}`}
                value={trackTime}
            ></input>
            <div className="player-control-panel">
                <div
                    className="previous"
                    onClick={() => previous(tracks, index)}
                ></div>
                <div className="play" onClick={() => play(trackId)}></div>
                <div
                    className="pause"
                    onClick={() => {
                        player.pause();
                        setIsPlaying(false);
                    }}
                ></div>
                <div
                    className="stop"
                    onClick={() => {
                        player.kill();
                        setIsPlaying(false);
                    }}
                ></div>
                <div className="next" onClick={() => next(tracks, index)}></div>
                <div className="shuffle" onClick={() => shuffle(tracks)}></div>
            </div>
        </div>
    );
}

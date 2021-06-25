import Animation from "./Animation";
import TickerArea from "./TickerArea";
import { useSelector, useDispatch } from "react-redux";
const secret = require("../../secrets.json").ClientId;
var SC = require("soundcloud");
import { useEffect, useState } from "react";
import { updateCurrentTrack } from "./actions";

export default function Header() {
    const tracks = useSelector((state) => state.tracks);
    const index = useSelector((state) => state.index);
    const trackId = useSelector((state) => state.trackId);
    const duration = useSelector((state) => state.duration);
    let [player, setPlayer] = useState();
    const [trackTime, setTrackTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

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
        console.log();
        if (player && player.isPlaying) {
            const interval = setInterval(function () {
                setTrackTime(player.currentTime());
                if (!player.isPlaying()) {
                    clearInterval(interval);
                }
            }, 100);
        }
    }, [isPlaying, trackTime]);

    const play = (trackId) => {
        console.log();
        if (player.isDead()) {
            SC.stream(`/tracks/${trackId}`).then(function (player) {
                setPlayer(player);
                player.play();
                setIsPlaying(true);
                return;
            });
        }
        player.play();
        // var newStream = new MediaStream(tracks);
        // console.log("player:", player);
        // var audioCtx = new window.AudioContext();
        // console.log("audioCtx", audioCtx);
        // var audioSourceNode = audioCtx.createMediaStreamSource(newStream);
        // var panNode = audioCtx.createStereoPanner();
        // console.log("panNode", panNode);
        // audioSourceNode.connect(panNode);
        // panNode.connect(audioCtx.destination);
        // panNode.pan.value = -1;

        setIsPlaying(true);
    };

    const next = (tracks, index) => {
        setTrackTime(0);
        let newTrack = tracks[index + 1];
        SC.stream(`/tracks/${newTrack.id}`).then(function (player) {
            setPlayer(player);
            player.play();

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
            setTrackTime(0);
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
                <TickerArea />
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
                        console.log("TrackTime", trackTime);
                    }}
                ></div>
                <div className="next" onClick={() => next(tracks, index)}></div>
                <div className="shuffle" onClick={() => shuffle(tracks)}></div>
            </div>
        </div>
    );
}

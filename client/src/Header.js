import TickerArea from "./TickerArea";
import { useSelector, useDispatch } from "react-redux";
import Animation from "./Animation";
const secret = require("../../secrets.json").ClientId || process.env.ClientId;
var SC = require("soundcloud");
import { useEffect, useState } from "react";
import { updateCurrentTrack } from "./actions";

export default function Header() {
    const tracks = useSelector((state) => state.tracks);
    const index = useSelector((state) => state.index);
    const trackId = useSelector((state) => state.trackId);
    const duration = useSelector((state) => state.duration);
    const permalinkUrl = useSelector((state) => state.permalink_url);
    const listElements = useSelector((state) => state.listElements);

    const [kbps, setKbps] = useState();
    const [volume, setVolume] = useState(1);
    const [khz, setKhz] = useState();
    const [trackTime, setTrackTime] = useState(0);
    const [player, setPlayer] = useState();
    const [isAnimation, setIsAnimation] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        SC.initialize({
            client_id: secret,
        });
    }, []);

    useEffect(
        () => {
            if (trackId) {
                if (player) {
                    player.kill();
                    setTrackTime(0);
                }
                SC.stream(`/tracks/${trackId}`).then(function (player) {
                    setPlayer(player);
                    player.play();
                    setIsAnimation(true);
                    player.setVolume(volume);
                    startCounting(player);
                    setKbps("128");
                    setKhz("96");
                });
            }
        },
        [trackId],
        [player]
    );

    const startCounting = (player) => {
        const interval = setInterval(function () {
            setTrackTime(player.currentTime());
            if (!player.isPlaying()) {
                if (!player) {
                    setTrackTime(0);
                }
                clearInterval(interval);
            }
        }, 10);
    };

    const play = (trackId) => {
        if (player.isDead()) {
            SC.stream(`/tracks/${trackId}`).then(function (player) {
                setPlayer(player);
                player.play();
                setIsAnimation(true);
                player.setVolume(volume);
                return;
            });
        }
        player.play();
        setIsAnimation(true);
        player.setVolume(volume);
        startCounting(player);
    };

    const next = (tracks, index) => {
        setBeckground(index + 1);
        player.kill();
        setTrackTime(0);
        let newTrack = tracks[index + 1];
        SC.stream(`/tracks/${newTrack.id}`).then(function (player) {
            setPlayer(player);
            setIsAnimation(true);
            player.setVolume(volume);
            dispatch(
                updateCurrentTrack(
                    index + 1,
                    newTrack.id,
                    newTrack.user.username,
                    newTrack.title,
                    newTrack.duration,
                    newTrack.artwork_url
                )
            );
        });
    };

    const previous = (tracks, index) => {
        setBeckground(index - 1);
        player.kill();
        setTrackTime(0);
        let newTrack = tracks[index - 1];
        SC.stream(`/tracks/${newTrack.id}`).then(function (player) {
            setPlayer(player);
            setIsAnimation(true);
            player.setVolume(volume);
            dispatch(
                updateCurrentTrack(
                    index - 1,
                    newTrack.id,
                    newTrack.user.username,
                    newTrack.title,
                    newTrack.duration,
                    newTrack.artwork_url
                )
            );
        });
    };

    const shuffle = (tracks) => {
        player.kill();
        setTrackTime(0);
        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        SC.stream(`/tracks/${randomTrack.id}`).then(function (player) {
            setPlayer(player);
            setIsAnimation(true);
            player.setVolume(volume);
            dispatch(
                updateCurrentTrack(
                    tracks.indexOf(randomTrack),
                    randomTrack.id,
                    randomTrack.user.username,
                    randomTrack.title,
                    randomTrack.duration,
                    randomTrack.artwork_url
                )
            );
            setBeckground(tracks.indexOf(randomTrack));
        });
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
    console.log(typeof permalinkUrl);

    return (
        <div className="header">
            <img className="winamp-bar" src="../winamp.png"></img>
            <div className="top-upper-pannel">
                <Animation isAnimation={isAnimation} trackTime={trackTime} />
                <TickerArea />
            </div>

            <p className="kbps">{kbps}</p>
            <p className="khz">{khz}</p>

            <input
                onChange={(e) => {
                    player.setVolume(e.target.value);
                    setVolume(e.target.value);
                }}
                className="volume-bar"
                title="volume-bar"
                type="range"
                min="0"
                max="1"
                step="0.01"
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
                        setIsAnimation(false);
                    }}
                ></div>
                <div
                    className="stop"
                    onClick={() => {
                        setTrackTime(0);
                        player.kill();
                        setIsAnimation(false);
                        setKbps("-");
                        setKhz("-");
                    }}
                ></div>
                <div className="next" onClick={() => next(tracks, index)}></div>
                <div className="shuffle" onClick={() => shuffle(tracks)}></div>
                <a href={permalinkUrl} target="_blank" rel="noreferrer">
                    <img className="sc" src="../soundcloud.png"></img>
                </a>
            </div>
        </div>
    );
}

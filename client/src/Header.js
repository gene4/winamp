import Animation from "./Animation";
import Ticker from "./Ticker";

export default function Header() {
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
                <div className="play"></div>
                <div className="pause"></div>
                <div className="stop"> </div>
                <div className="next"></div>
                <div className="shuffle"></div>
            </div>
        </div>
    );
}

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
            <input
                className="progress-bar"
                type="range"
                min="0"
                max="100"
                step="1"
            ></input>
            <div className="player-control-pannel">
                <div className="previous"></div>
                <div className="play"></div>
                <div className="pause"></div>
                <div className="stop"> </div>
                <div className="next"></div>
            </div>
        </div>
    );
}

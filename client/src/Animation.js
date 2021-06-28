export default function Animation({ isAnimation, trackTime }) {
    // console.log("trackTime", trackTime);

    const millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (
            (minutes < 10 ? "0" : "") +
            minutes +
            ":" +
            (seconds < 10 ? "0" : "") +
            seconds
        );
    };
    return (
        <div className="animation">
            <div className="timer">
                {" "}
                {trackTime > 0 && <p>{millisToMinutesAndSeconds(trackTime)}</p>}
            </div>

            {isAnimation && <img src="https://j.gifs.com/yEGl9X.gif"></img>}
        </div>
    );
}

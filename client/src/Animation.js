import { useSelector } from "react-redux";
// import { useEffect } from "react";

export default function Animation() {
    const artwork = useSelector((state) => state.artwork_url);
    // const spinner =
    //     "https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif";
    // const player = useSelector((state) => state.player);

    return (
        <div className="animation">
            {artwork && <img className="artwork" src={artwork}></img>}
        </div>
    );
}

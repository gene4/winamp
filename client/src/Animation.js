import { useSelector } from "react-redux";

export default function Animation() {
    const artwork = useSelector((state) => state.artwork_url);
    return (
        <div className="animation">
            {artwork && <img className="artwork" src={artwork}></img>}
        </div>
    );
}

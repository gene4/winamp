import { useSelector } from "react-redux";

export default function Eq() {
    const artwork = useSelector((state) => state.artwork_url);

    return (
        <div className="middle-container">
            <div className="big-screen">
                {artwork && <img className="artwork" src={artwork}></img>}
            </div>
        </div>
    );
}

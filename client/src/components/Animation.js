import { setTimer } from "../actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatTime } from "../../public/utils/formatTime";

export default function Animation({ isAnimation, trackTime }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTimer(trackTime));
    }, [trackTime]);

    return (
        <div className="animation">
            <div className="timer">
                {trackTime > 0 && <p>{formatTime(trackTime)}</p>}
            </div>

            {isAnimation && <img src="https://j.gifs.com/yEGl9X.gif"></img>}
        </div>
    );
}

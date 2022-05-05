import { useSelector, useDispatch } from "react-redux";
import { togglePlaylist } from "../actions";
import { formatTime } from "../../public/utils/formatTime";

export default function ButtomRight() {
    const isPlaylist = useSelector((state) => state.isPlaylist);
    const trackTime = useSelector((state) => state.trackTime);

    const dispatch = useDispatch();

    return (
        <div className="buttom-right">
            <div className="buttom-timer">
                {trackTime > 0 && <p>{formatTime(trackTime)}</p>}
            </div>
            <div
                onClick={() => {
                    dispatch(togglePlaylist(isPlaylist));
                }}
                className="playlist-button"
            />
        </div>
    );
}

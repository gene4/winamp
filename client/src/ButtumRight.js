import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { togglePlaylist } from "./actions";

export default function ButtomRight() {
    const isPlaylist = useSelector((state) => state.isPlaylist);

    useEffect(() => {}, [isPlaylist]);
    const dispatch = useDispatch();

    return (
        <div className="buttom-right">
            <div
                onClick={() => {
                    dispatch(togglePlaylist(isPlaylist));
                }}
                className="playlist-button"
            ></div>
        </div>
    );
}

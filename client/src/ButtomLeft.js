import { useDispatch, useSelector } from "react-redux";
import { insertTrack, deleteTrack, setIsScreen, setShare } from "./actions";

export default function ButtomLeft() {
    const user = useSelector((state) => state.user);
    const trackId = useSelector((state) => state.trackId);
    const duration = useSelector((state) => state.duration);
    const title = useSelector((state) => state.title);
    const artwork_url = useSelector((state) => state.artwork_url);
    const permalink_url = useSelector((state) => state.permalink_url);
    const userId = useSelector((state) => state.userId);
    const isScreen = useSelector((state) => state.isScreen);
    const isShare = useSelector((state) => state.isShare);

    const dispatch = useDispatch();

    const toggleScreen = (isScreen) => {
        console.log("in toggle screen");
        dispatch(setIsScreen(isScreen));
    };

    const toggleShare = (isShare) => {
        console.log("in toggle screen");
        dispatch(setShare(isShare));
    };

    return (
        <div className="buttom-left">
            <div
                className="add"
                onClick={() =>
                    dispatch(
                        insertTrack({
                            trackId: trackId,
                            user: user,
                            duration: duration,
                            title: title,
                            artwork_url: artwork_url,
                            permalink_url: permalink_url,
                            userId: userId,
                        })
                    )
                }
            ></div>
            <div
                className="delete"
                onClick={() => dispatch(deleteTrack(trackId))}
            ></div>
            <div
                onClick={() => toggleScreen(isScreen)}
                className="select"
            ></div>
            <div onClick={() => toggleShare(isShare)} className="share"></div>
        </div>
    );
}

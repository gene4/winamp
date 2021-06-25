import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function TickerArea() {
    const user = useSelector((state) => state.user);
    const title = useSelector((state) => state.title);

    // var ticker = document.getElementsByClassName("ticker-area").cloneNode(true);
    // var element = document.getElementsByClassName("track-info").offsetWidth;
    // console.log("offsetwidth", element);

    // useEffect(() => {
    //     ticker.append(clone);
    // }, []);
    return (
        <div className="ticker-area">
            <p className="track-info">
                {user} - {title}
            </p>
        </div>
    );
}

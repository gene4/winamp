import { useSelector } from "react-redux";
// import { useEffect } from "react";

export default function TickerArea() {
    const user = useSelector((state) => state.user);
    const title = useSelector((state) => state.title);
    const userId = useSelector((state) => state.userId);
    // const player = useSelector((state) => state.player);

    // var ticker = document.getElementsByClassName("ticker-area").cloneNode(true);
    // var element = document.getElementsByClassName("track-info").offsetWidth;
    // console.log("offsetwidth", element);

    // useEffect(() => {
    //     ticker.append(clone);
    // }, []);
    return (
        <div className="ticker-area">
            {!userId && (
                <p className="track-info">Welcome to the Soundcloud Winamp!</p>
            )}

            {user && (
                <p className="track-info">
                    {user} - {title}
                </p>
            )}
        </div>
    );
}

import { useSelector } from "react-redux";

export default function TickerArea() {
    const user = useSelector((state) => state.user);
    const title = useSelector((state) => state.title);
    const userId = useSelector((state) => state.userId);
  
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

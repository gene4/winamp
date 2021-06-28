import Search from "./Search";
import Playlist from "./Playlist";
import { useSelector } from "react-redux";

export default function Content() {
    const isPlaylist = useSelector((state) => state.isPlaylist);

    if (isPlaylist) {
        return (
            <div className="content">
                <Playlist />
            </div>
        );
    } else {
        return (
            <div className="content">
                <Search />
            </div>
        );
    }
}

import Search from "../components/Search";
import Playlist from "../components/Playlist";
import { useSelector } from "react-redux";

export default function Content() {
    const isPlaylist = useSelector((state) => state.isPlaylist);

    return (
        <div className="content">{isPlaylist ? <Playlist /> : <Search />}</div>
    );
}

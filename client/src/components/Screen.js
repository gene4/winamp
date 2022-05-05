import Welcome from "../Welcome";
import Content from "./Content";
import { useSelector } from "react-redux";

export default function Screen() {
    const userId = useSelector((state) => state.userId);

    return (
        <div className="screen-container">
            {userId ? <Content /> : <Welcome />}
        </div>
    );
}

import Welcome from "./Welcome";
import Content from "./Content";
import { useSelector } from "react-redux";

export default function Screen() {
    const userId = useSelector((state) => state.userId);

    if (!userId) {
        return <Welcome />;
    } else {
        return <Content />;
    }
}

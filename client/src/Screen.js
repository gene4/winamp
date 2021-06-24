import Welcome from "./Welcome";
import Content from "./Content";

export default function Screen({ userId }) {
    console.log("userId in screen", userId);

    if (!userId) {
        return <Welcome />;
    } else {
        return <Content />;
    }
}

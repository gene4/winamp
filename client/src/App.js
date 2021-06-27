import axios from "./axios";
import { useEffect } from "react";
import Header from "./Header";
import Eq from "./Eq";
import Screen from "./Screen";
import ButtomLeft from "./ButtomLeft";
import ButtomRight from "./ButtumRight";
import { useDispatch } from "react-redux";
import { setUserId } from "./actions";

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("/user/id.json").then(function ({ data }) {
            dispatch(setUserId(data.userId));
        });
    }, []);

    return (
        <div className="winamp">
            <Header />
            <Eq />
            <div className="screen-container">
                <Screen />
            </div>

            <div className="buttom-panel">
                <ButtomLeft />
                <ButtomRight />
            </div>
        </div>
    );
}

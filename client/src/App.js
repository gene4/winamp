import axios from "./axios";
import { useEffect } from "react";
import Header from "./components/Header";
import Eq from "./components/Eq";
import Screen from "./components/Screen";
import ButtomLeft from "./components/ButtomLeft";
import ButtomRight from "./components/ButtumRight";
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
        <div className="app">
            <Header />
            <Eq />
            <Screen />
            <div className="buttom-panel">
                <ButtomLeft />
                <ButtomRight />
            </div>
        </div>
    );
}

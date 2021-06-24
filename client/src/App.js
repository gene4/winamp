import axios from "./axios";
import { useState, useEffect } from "react";
import Header from "./Header";
import Eq from "./Eq";
import Screen from "./Screen";
import ButtomLeft from "./ButtomLeft";
import ButtomRight from "./ButtumRight";

export default function App() {
    const [userId, setUserId] = useState();

    useEffect(() => {
        axios.get("/user/id.json").then(function ({ data }) {
            setUserId(data.userId);
        });
    }, []);

    console.log("userId in app", userId);

    return (
        <div className="winamp">
            <Header />
            <Eq />
            <div className="screen-container">
                <Screen userId={userId} />
            </div>

            <div className="buttom-panel">
                <ButtomLeft />
                <ButtomRight />
            </div>
        </div>
    );
}

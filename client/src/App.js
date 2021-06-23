import axios from "./axios";
import { useState, useEffect } from "react";
import Header from "./Header";
import Eq from "./Eq";
import Screen from "./Screen";
import ButtomLeft from "./ButtomLeft";
import ButtomRight from "./ButtumRight";

export default function App() {
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

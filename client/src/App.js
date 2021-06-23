import axios from "./axios";
import { useState, useEffect } from "react";
import Header from "./Header";
import Eq from "./Eq";
import Screen from "./Screen";

export default function App() {
    return (
        <div>
            <Header />
            <Eq />
            <Screen />
        </div>
    );
}

import Registration from "./Registration.js";
import { HashRouter, Route } from "react-router-dom";
import Login from "./Login";

export default function Welcome() {
    return (
        <>
            <HashRouter>
                <>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </>
            </HashRouter>
        </>
    );
}

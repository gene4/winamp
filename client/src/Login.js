import axios from "./axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState();

    const handleChange = (event) => {
        console.log("CHANGE", event.target.name, event.target.value);
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    const handleLogin = (event) => {
        console.log("SUBMIT", userData);

        event.preventDefault();
        axios
            .post("/login", userData)
            .then(({ data }) => {
                console.log("data", data);
                if (data.success === false) {
                    setError({
                        error: true,
                    });
                } else {
                    location.reload();
                }
            })
            .catch((err) => {
                console.log("error in registration", err);
                setError({
                    error: true,
                });
            });
    };
    return (
        <div className="login">
            <form onSubmit={(event) => handleLogin(event)}>
                <p>please login!</p>
                <div>
                    <input
                        placeholder="email"
                        name={"email"}
                        type={"email"}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        placeholder="password"
                        name={"password"}
                        type={"password"}
                        onChange={handleChange}
                    />
                </div>
                <button type={"submit"}>login!</button>
                <p className="member">
                    click{" "}
                    <Link className="here" to="/">
                        {" "}
                        here
                    </Link>{" "}
                    to register!
                </p>
                {error && <p>Oupsi! Something went wrong, try again.</p>}
            </form>
        </div>
    );
}

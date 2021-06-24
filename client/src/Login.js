import axios from "./axios";
import { useState, useEffect } from "react";
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
            {error && <p>Oupsi! Something went wrong, try again.</p>}

            <form className="login" onSubmit={(event) => handleLogin(event)}>
                <h1>Login</h1>
                <input
                    name={"email"}
                    placeholder={"email"}
                    type={"email"}
                    onChange={handleChange}
                />
                <input
                    name={"password"}
                    placeholder={"password"}
                    type={"password"}
                    onChange={handleChange}
                />
                <button type={"submit"}>Login</button>
                <p className="member">
                    Click{" "}
                    <Link className="here" to="/">
                        {" "}
                        here{" "}
                    </Link>{" "}
                    to register!
                </p>
            </form>
        </div>
    );
}

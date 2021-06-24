import axios from "./axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Registration() {
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState();

    const handleChange = (event) => {
        console.log("CHANGE", event.target.name, event.target.value);
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        console.log("SUBMIT", userData);

        event.preventDefault();
        axios
            .post("/register", userData)
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
                // Update the erro in the state here.
                setError({
                    error: true,
                });
            });
    };

    return (
        <div className="registration">
            {error && <p>Oupsi! Something went wrong, try again.</p>}

            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>Register</h1>
                <input
                    name={"firstName"}
                    placeholder={"First Name"}
                    onChange={handleChange}
                />
                <input
                    name={"lastName"}
                    placeholder={"Last Name"}
                    onChange={handleChange}
                />
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
                <button type={"submit"}>Register</button>
                <p className="member">
                    Already a member?! Click{" "}
                    <Link className="here" to="/login">
                        here
                    </Link>{" "}
                    to Login!
                </p>
            </form>
        </div>
    );
}
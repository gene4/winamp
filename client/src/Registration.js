import axios from "./axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Registration() {
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState();

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("/register", userData)
            .then(({ data }) => {
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
        <div className="registration">
            {error && <p>Oupsi! Something went wrong, try again.</p>}

            <form onSubmit={(event) => handleSubmit(event)}>
                <p>please register!</p>
                <div>
                    <input
                        placeholder="first name"
                        name={"firstName"}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        placeholder="last name"
                        name={"lastName"}
                        onChange={handleChange}
                    />
                </div>
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
                <button type={"submit"}>register!</button>
                <p className="member">
                    already a member?! click{" "}
                    <Link className="here" to="/login">
                        here
                    </Link>{" "}
                    to login!
                </p>
            </form>
        </div>
    );
}

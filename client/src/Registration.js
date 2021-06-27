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
                <p>1. please register!</p>
                <div>
                    <label>2. first name</label>
                    <input name={"firstName"} onChange={handleChange} />
                </div>
                <div>
                    <label>3. last name</label>
                    <input name={"lastName"} onChange={handleChange} />
                </div>
                <div>
                    <label>4. email</label>
                    <input
                        name={"email"}
                        type={"email"}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>5. password</label>
                    <input
                        name={"password"}
                        type={"password"}
                        onChange={handleChange}
                    />
                </div>
                <button type={"submit"}>6. register!</button>
                <p className="member">
                    7. already a member?! click{" "}
                    <Link className="here" to="/login">
                        here
                    </Link>{" "}
                    to login!
                </p>
            </form>
        </div>
    );
}

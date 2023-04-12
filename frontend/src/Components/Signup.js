import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        axios.post('/signup', {username: username, password: password})
            .then((obj) => {
                if(obj.data.errorMsg) {
                    console.log("User already there in the db");
                } else {
                    console.log("User created");
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            {/* Write the html code here */}
            <h1>Hello from Signup</h1>
            <form method="post" onSubmit={handleSignUp}>
                <input className="border border-black" type="text" name="username" onChange={(e) => {
                    setUsername(e.target.value);
                }}/>

                <input className="border border-black" type="password" name="password" onChange={(e) => {
                    setPassword(e.target.value);
                }} />
                <button className="border border-black" type="submit">Sign Up</button>
            </form>
        </>
    )
};

export default Signup;
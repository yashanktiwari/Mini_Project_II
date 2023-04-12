import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('/login', {username, password})
            .then((obj) => {
                if(!obj.data.userObj.message) {
                    localStorage.setItem('isLoggedIn', JSON.stringify(obj.data.token));

                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 1000);
                } else {
                    console.log(obj.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            {/* Write the html code here */}
            <form method='post' onSubmit={handleLogin}>
                <input className='border border-black' type='text' placeholder='Username' name='username' onChange={(e) => {
                    setUsername(e.target.value);
                }
                }/>
                <input className='border border-black' type='text' placeholder='Password' name='password' onChange={(e) => {
                    setPassword(e.target.value);
                }
                }/>
                <button className='border border-black' type='submit'>Login</button>
            </form>
        </>
    )
};

export default Login;
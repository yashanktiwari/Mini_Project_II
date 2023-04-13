import { useSelector,useDispatch } from "react-redux";
import {setUser} from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import CommonNavbar from "../Components/CommonNavbar";

const Dashboard = () => {

    const navigate = useNavigate();
    if(localStorage.getItem("isLoggedIn") == null) {
        navigate("/");
    }

    const userStore = useSelector(store => store.user);
    const dispatch = useDispatch();

    const [token, setToken] = useState();

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('isLoggedIn')));

        if(token) {
            axios.post('/extractToken', {token})
                .then((obj) => {
                    dispatch(setUser(obj.data));
                })
                .catch((error) => {
                    return {
                        errorMsg: error
                    }
                });
        }
    }, [token])

    return (
        <>
            <CommonNavbar />
            <h1>Dashboard</h1>
            <h1>User is logged in</h1>
            <h1>The email is: {userStore.user.email}</h1>
            <h1>The userid is: {userStore.user._id}</h1>
            <h1>The role is: {userStore.user.role}</h1>
            {/*<button onClick={handleLogout}>Logout</button>*/}
            {/*<Footer />*/}
        </>
    )
};

export default Dashboard;
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import CommonNavbar from "../Components/CommonNavbar";
import verifyToken from "../utils/verifyToken";

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
            verifyToken(token, navigate, dispatch);
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
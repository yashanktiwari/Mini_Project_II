import CommonNavbar from "../Components/CommonNavbar";
import { useParams } from 'react-router';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import verifyToken from "../utils/verifyToken";

const ProfilePage = () => {
    const {id} = useParams();

    const [token, setToken] = useState();

    const dispatch = useDispatch();

    const userStore = useSelector(store => store.user);

    const navigate = useNavigate();
    useEffect(() => {
        if(userStore.user._id == null) {
            setToken(JSON.parse(localStorage.getItem('isLoggedIn')));
            if(token) {
                verifyToken(token, navigate, dispatch);
            }
        }
    }, [token]);

    return (
        <>
            {/* Write the html code here */}
            <CommonNavbar />
            <h1>Hii from Profile Page</h1>
        </>
    )
};

export default ProfilePage;
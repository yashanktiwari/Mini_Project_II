import CommonNavbar from "../Components/CommonNavbar";
import { useParams } from 'react-router';
import {useEffect, useState} from "react";
import axios from "axios";
import {setUser} from "../utils/userSlice";
import {useDispatch, useSelector} from "react-redux";

const ProfilePage = () => {
    const {id} = useParams();

    const [token, setToken] = useState();

    const dispatch = useDispatch();

    const userStore = useSelector(store => store.user);

    useEffect(() => {
        if(userStore.user._id == null) {
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
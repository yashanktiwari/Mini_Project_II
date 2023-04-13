import CommonNavbar from "../Components/CommonNavbar";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUser} from "../utils/userSlice";

const WishlistPage = () => {

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
            <h1>Hii from wishlist page</h1>
        </>
    )
};

export default WishlistPage;
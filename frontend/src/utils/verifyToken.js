import axios from "axios";
import {toast} from "react-toastify";
import {setUser} from "./userSlice";

const verifyToken = (token, navigate, dispatch) => {
    axios.post('/extractToken', {token})
        .then((obj) => {
            if(obj.data.error) {
                toast.error("You need to login again");
                localStorage.removeItem("isLoggedIn");
                navigate('/');
            } else {
                dispatch(setUser(obj.data));
            }
        })
        .catch((error) => {
            return {
                errorMsg: error
            }
        });
}

export default verifyToken;
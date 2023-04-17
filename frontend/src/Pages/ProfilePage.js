import CommonNavbar from "../Components/CommonNavbar";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import verifyToken from "../utils/verifyToken";
import axios from "axios";
import {toast} from "react-toastify";

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

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [altPhone, setAltPhone] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState([]);

    useEffect(() => {
        if(userStore.user) {
            setUsername(userStore.user.username);
            setEmail(userStore.user.email);
            setPhone(userStore.user.phone);
            setAltPhone(userStore.user.altPhone);
            setState(userStore.user.state);
            setCity(userStore.user.city);
            setAddress(userStore.user.address);
        }
    }, [userStore])


    function handleProfileUpdate(e) {
        toast.success("Updating profile");
        axios.patch('/updateprofile', {
            userid: id,
            profile_image: userStore.user.profile_image,
            username,
            email,
            phone,
            altPhone,
            state,
            city,
            address,
            retailer: userStore.user.role
        })
            .then((obj) => {
                verifyToken(token, navigate, dispatch);
                toast.success("Profile updated successfully");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            {/* Write the html code here */}
            <CommonNavbar />

            <img src={userStore.user.profile_image} alt="..." className="rounded-full h-32 w-32"/>

            <label>Name: </label>
            <input value={username} className={"border border-black p-1 block w-[15rem]"} onChange={(e) => {
                setUsername(e.target.value);
            }}/>
            {/*<label className={"block"}>If you are changing the name, then you need to login again.</label>*/}

            <label>Email: </label>
            <label>{email}</label>
            {/*<input value={email} className={"border border-black p-1 block w-[15rem]"} onChange={(e) => {*/}
            {/*    setEmail(e.target.value);*/}
            {/*}}/>*/}

            <label className={"block"}>Contact Number: </label>
            <input value={phone} className={"border border-black p-1 block w-[15rem]"} onChange={(e) => {
                setPhone(e.target.value);
            }}/>

            <label>Alternate Contact Number: </label>
            <input value={altPhone} className={"border border-black p-1 block w-[15rem]"} onChange={(e) => {
                setAltPhone(e.target.value);
            }}/>

            <label>State: </label>
            <input value={state} className={"border border-black p-1 block w-[15rem]"} onChange={(e) => {
                setState(e.target.value);
            }}/>

            <label>City: </label>
            <input value={city} className={"border border-black p-1 block w-[15rem]"} onChange={(e) => {
                setCity(e.target.value);
            }}/>

            <label>Address: </label>
            <textarea value={address} className={"border border-black p-1 block w-[15rem] resize-none overflow-hidden overflow-y-scroll"} onChange={(e) => {
                setAddress(e.target.value);
            }}></textarea>

            {/*<input value={address} className={"border border-black p-1"} onChange={(e) => {*/}
            {/*    setAddress(e.target.value);*/}
            {/*}}/>*/}

            <button className="border border-black p-1 mt-2" onClick={handleProfileUpdate}>Update</button>
        </>
    )
};

export default ProfilePage;
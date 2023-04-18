import CommonNavbar from "../Components/CommonNavbar";
import {useParams} from "react-router";
import {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import verifyToken from "../utils/verifyToken";
import axios from "axios";
import {toast} from "react-toastify";

const ProfilePage = () => {

    const {id} = useParams();
    const [token, setToken] = useState();

    const dispatch = useDispatch();

    const inputRef = useRef();

    const userStore = useSelector(store => store.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (userStore.user._id == null) {
            setToken(JSON.parse(localStorage.getItem('isLoggedIn')));
            if (token) {
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
    const [showImage, setShowImage] = useState("");

    useEffect(() => {
        if (userStore.user) {
            setUsername(userStore.user.username);
            setEmail(userStore.user.email);
            setPhone(userStore.user.phone);
            setAltPhone(userStore.user.altPhone);
            setState(userStore.user.state);
            setCity(userStore.user.city);
            setAddress(userStore.user.address);
        }
    }, [userStore])

    const setFiletoBase = (file) => {
        const reader = new FileReader();

        // Reader is reading the file
        reader.readAsDataURL(file);

        // Once the reading is completed, onloadend is triggered
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    function handleImageSubmission(e) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            // Checking if the file is an image or not
            setFiletoBase(image);
            setShowImage(URL.createObjectURL(image));
        }
    }

    function handleProfileUpdate(e) {
        toast.success("Updating profile");

        if(image.length == 0) {
            axios.patch('/updateprofile', {
                userid: id,
                profile_image: userStore.user.profile_image,
                public_id: userStore.user.public_id,
                username,
                email,
                phone,
                altPhone,
                state,
                city,
                address,
                role: userStore.user.role,
                upload: false
            })
                .then((obj) => {
                    const curToken = JSON.parse(localStorage.getItem('isLoggedIn'));
                    verifyToken(curToken, navigate, dispatch);
                    toast.success("Profile updated successfully");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios.patch('/updateprofile', {
                userid: id,
                profile_image: image,
                public_id: userStore.user.public_id,
                username,
                email,
                phone,
                altPhone,
                state,
                city,
                address,
                role: userStore.user.role,
                upload: true
            })
                .then((obj) => {
                    const curToken = JSON.parse(localStorage.getItem('isLoggedIn'));
                    verifyToken(curToken, navigate, dispatch);
                    toast.success("Profile updated successfully");
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    return (
        <>
            {/* Write the html code here */}
            <CommonNavbar/>

            {showImage ? (
                <img src={showImage} alt="..." className={"cursor-pointer rounded-full h-32 w-32"}
                     onClick={() => {
                         inputRef.current.click()
                     }}/>
            ) : (
                <img src={userStore.user.profile_image} alt="..." className={"cursor-pointer rounded-full h-32 w-32"}
                     onClick={() => {
                         inputRef.current.click()
                     }}/>
            )}

            <input type={"file"} ref={inputRef} accept={"image/png, image/jpg"} className={"hidden"}
                   onChange={handleImageSubmission}/>

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
            <textarea value={address}
                      className={"border border-black p-1 block w-[15rem] resize-none overflow-hidden overflow-y-scroll"}
                      onChange={(e) => {
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
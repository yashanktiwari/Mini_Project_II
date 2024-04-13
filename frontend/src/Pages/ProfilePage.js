import CommonNavbar from "../Components/CommonNavbar";
import {useParams} from "react-router";
import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import verifyToken from "../utils/verifyToken";
import axios from "axios";
import {toast} from "react-toastify";
import Footer from "../Components/Footer";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

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

    // Toggle Update Info Modal
    const overlayRef = useRef();

    const toggleModal = () => {
        setUsername(userStore.user.username);
        setPhone(userStore.user.phone);
        setAltPhone(userStore.user.altPhone);
        setState(userStore.user.state);
        setCity(userStore.user.city);
        setAddress(userStore.user.address);
        setShowImage(userStore.user.profile_image);
        overlayRef.current.classList.toggle("hidden");
        overlayRef.current.classList.toggle("flex");
    }

    const vidRef = useRef();
    const vidHiddenRef = useRef();

    const [isVisible, setIsVisible] = useState(false);

    const toggleVID = () => {
        if(isVisible) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        vidRef.current.classList.toggle("hidden");
        vidHiddenRef.current.classList.toggle("hidden");
    }

    function handleProfileUpdate(e) {
        toast.success("Updating profile");
        toggleModal();
        if(image.length === 0) {
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
                upload: false,
                vid: userStore.user.vid
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
                upload: true,
                vid: userStore.user.vid
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
            <CommonNavbar/>
            <section className="bg-gray-900">
                <div className="grid md:grid-rows-2 p-8">
                    <div className="bg-gray-800 m-5 rounded-2xl p-4 grid sm:grid-cols-8">

                        <div className="flex justify-between col-span-8 sm:grid sm:place-items-center sm:col-span-2">
                            <div className="sm:hidden"></div>
                            <div className="grid place-items-center ml-5 sm:ml-0 col-span-2">
                                {userStore.user?.profile_image ? (
                                    <img src={userStore.user.profile_image} alt="..." className={"border-4 border-white rounded-full h-32 w-32"}
                                    />
                                ) : null}
                            </div>
                            <div className="sm:hidden block">
                                <button className="rounded hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]" onClick={toggleModal}>
                                    <img src="https://www.svgrepo.com/show/502640/edit-1.svg" className="invert h-6 md:h-10 bg-transparent " alt="..." />
                                </button>
                            </div>
                        </div>


                        <div className="col-span-5 ml-4 md:ml-0">

                            <p className="font-semibold text-center md:text-left tracking-wide text-xl md:text-4xl mt-2 md:mt-4 text-white">{username}</p>

                            <p className="font-medium text-center md:text-left text-lg md:text-2xl mt-2 md:mt-4 capitalize text-gray-100">{userStore.user.role}</p>


                            <div className="mt-2 md:mt-4 text-center md:text-left">
                                <p className="font-medium text-lg md:text-2xl mt-2 md:mt-4 capitalize text-gray-300 hover:text-gray-100 inline">VID : </p>

                                <p className="font-medium text-lg md:text-2xl mt-2 md:mt-4 mr-2 capitalize text-gray-300 hover:text-gray-100 inline" ref={vidHiddenRef}>XXXX XXXX {userStore.user?.vid?.substring(8, 12)}</p>

                                <p className="hidden font-medium text-lg md:text-2xl mt-5 capitalize text-gray-300 hover:text-gray-100 mr-2 inline" ref={vidRef}>{userStore.user?.vid?.substring(0, 4)} {userStore.user?.vid?.substring(4, 8)} {userStore.user?.vid?.substring(8, 12)}</p>

                                {isVisible ? (
                                    <>
                                        <button onClick={toggleVID} className="invert text-lg inline"><AiFillEyeInvisible/></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={toggleVID} className="invert text-lg inline"><AiFillEye/></button>
                                    </>
                                )}
                            </div>

                        </div>

                        <div className="hidden sm:block">
                            <button className="rounded hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]" onClick={toggleModal}>
                                <img src="https://www.svgrepo.com/show/502640/edit-1.svg" className="invert h-10 bg-transparent " alt="..." />
                            </button>
                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-8 m-5">

                        <div className="bg-gray-800 rounded-2xl p-4">
                            <h3 className="text-xl md:text-3xl mb-3 font-bold text-white">Contact Details </h3>

                            <div className={"mb-2"}>
                                <label>
                                    <img src="https://www.svgrepo.com/show/435312/email.svg" className="h-5 md:h-7 inline invert" alt={"...."}/>
                                </label>
                                <span className="ml-2 text-base md:text-lg text-white">{email}</span>
                            </div>

                            <div className={"mb-2"}>
                                <label>
                                    <img src="https://www.svgrepo.com/show/511585/call-191.svg" className="h-5 md:h-7 inline invert"  alt={"..."}/>
                                </label>
                                <span className="ml-2 text-base md:text-lg text-white">+91-{userStore.user.phone}</span>

                            </div>

                            <div className={"mb-2"}>
                                <label className="">
                                    <svg viewBox="0 0 24 24" fill="none" className="h-5 md:h-7 inline invert" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 1C2.34315 1 1 2.34315 1 4V15C1 16.6569 2.34315 18 4 18H6V22C6 22.388 6.22446 22.741 6.57584 22.9056C6.92723 23.0702 7.3421 23.0166 7.64018 22.7682L13.362 18H20C21.6569 18 23 16.6569 23 15V4C23 2.34315 21.6569 1 20 1H4Z" fill="#000000"></path> </g></svg>
                                </label>
                                <span className={"ml-2 text-base md:text-lg text-white"}>+91-{userStore.user.altPhone}</span>

                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-2xl p-4">
                            <h3 className="text-xl md:text-3xl mb-3 font-bold text-white">Address Details </h3>
                            <div className="mb-2">
                                <label>
                                    <img src="https://www.svgrepo.com/show/418950/address-location-map.svg" alt={"..."} className={"h-5 md:h-7 inline invert"}/>
                                </label>
                                <span className="ml-2 text-base md:text-lg text-white">{userStore.user.address}</span>
                                {/*<textarea value={address}*/}
                                {/*          className={"border border-black p-1 block w-[15rem] resize-none overflow-hidden overflow-y-scroll"}*/}
                                {/*          onChange={(e) => {*/}
                                {/*              setAddress(e.target.value);*/}
                                {/*          }}>*/}

                                {/*</textarea>*/}
                            </div>


                            <div className="mb-2">
                                <label>
                                    <svg fill="#000000" viewBox="0 0 24 24" className="h-5 md:h-7 inline invert" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M13,9a1,1,0,0,0-1-1H3A1,1,0,0,0,2,9V22H13ZM6,20H4V18H6Zm0-4H4V14H6Zm0-4H4V10H6Zm5,8H8V18h3Zm0-4H8V14h3Zm0-4H8V10h3Zm3.5-6H6V3A1,1,0,0,1,7,2H17a1,1,0,0,1,1,1v7H15V6.5A.5.5,0,0,0,14.5,6ZM22,13v9H19.5V18h-2v4H15V13a1,1,0,0,1,1-1h5A1,1,0,0,1,22,13Z"></path></g></svg>
                                </label>
                                <span className="ml-2 text-base md:text-lg text-white">{userStore.user.city}</span>

                            </div>

                            <div className="mb-2">
                                <label>
                                    <img src="https://www.svgrepo.com/show/308274/government-building-building-museum-power.svg" className={"inline h-5 md:h-7 invert"} alt="..."/>
                                </label>
                                <span className={"ml-2 text-base md:text-lg text-white"}>{userStore.user.state}</span>
                                {/*<input value={state} className={"border border-black p-1 block w-[15rem]"} onChange={(e) => {*/}
                                {/*    setState(e.target.value);*/}
                                {/*}}/>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-black bg-opacity-50 w-full h-full absolute top-56 md:top-6 inset-0 justify-center items-center px-6 py-3 text-white rounded shadow hidden" ref={overlayRef}>
                <div className="bg-gray-800 py-2 px-3 rounded shadow-xl text-white w-[85%] md:w-[70%]">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-2xl md:text-4xl font-bold">
                            Update Details
                        </h4>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full" onClick={toggleModal}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>

                    <div className="mt-2">

                        <form>

                            <div className="grid md:grid-cols-2 md:gap-6">

                                <div className="grid place-items-center col-span-full">

                                    {showImage ? (
                                        <img src={showImage} alt="..." className={"cursor-pointer border-4 border-white rounded-full h-32 w-32"}
                                             onClick={() => {
                                                 inputRef.current.click()
                                             }}/>
                                    ) : (
                                        <img src={userStore.user.profile_image} alt="..." className={"cursor-pointer border-4 border-white rounded-full h-32 w-32"}
                                             onClick={() => {
                                                 inputRef.current.click()
                                             }}/>
                                    )}

                                    <input type={"file"} ref={inputRef} accept={"image/png, image/jpg"} className={"hidden"}
                                           onChange={handleImageSubmission}/>

                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" value={username} name="floating_first_name" id="floating_first_name"
                                           className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                                           placeholder=" " required onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}/>
                                    <label htmlFor="floating_first_name"
                                           className="peer-focus:font-medium absolute text-md text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Username
                                    </label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="tel" value={phone} name="floating_first_name" id="floating_first_name"
                                           className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                                           placeholder=" " required onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}/>
                                    <label htmlFor="floating_first_name"
                                           className="peer-focus:font-medium absolute text-md text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Primary Mobile No.
                                    </label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="tel" value={altPhone} name="floating_first_name" id="floating_first_name"
                                           className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                                           placeholder=" " required onChange={(e) => {
                                        setAltPhone(e.target.value);
                                    }}/>
                                    <label htmlFor="floating_first_name"
                                           className="peer-focus:font-medium absolute text-md text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Alternate Mobile No.
                                    </label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" value={address} name="floating_first_name" id="floating_first_name"
                                           className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                                           placeholder=" " required onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}/>
                                    <label htmlFor="floating_first_name"
                                           className="peer-focus:font-medium absolute text-md text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Address
                                    </label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" value={city} name="floating_first_name" id="floating_first_name"
                                           className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                                           placeholder=" " required onChange={(e) => {
                                        setCity(e.target.value);
                                    }}/>
                                    <label htmlFor="floating_first_name"
                                           className="peer-focus:font-medium absolute text-md text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        City
                                    </label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" value={state} name="floating_first_name" id="floating_first_name"
                                           className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                                           placeholder=" " required onChange={(e) => {
                                        setState(e.target.value);
                                    }}/>
                                    <label htmlFor="floating_first_name"
                                           className="peer-focus:font-medium absolute text-md text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        State
                                    </label>
                                </div>
                            </div>

                        </form>

                    </div>

                    <div className={"mt-3 flex justify-end space-x-3"}>
                        <button className="px-3 py-1 rounded hover:bg-red-600 hover:bg-opacity-50 hover:text-red-100" onClick={toggleModal}>Cancel</button>
                        <button className="px-3 py-1 bg-red-800 text-gray-200 rounded hover:bg-red-600" onClick={handleProfileUpdate}>Update</button>
                    </div>
                    {/*<button className="p-1 mt-2 bg-blue-600 text-white px-3 py-2 rounded" onClick={handleProfileUpdate}>*/}
                    {/*    Update*/}
                    {/*</button>*/}
                </div>
            </div>
            <Footer/>
        </>
    )
};

export default ProfilePage;
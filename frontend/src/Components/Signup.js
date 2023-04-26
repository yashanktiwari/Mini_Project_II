import React, {useState, useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/SignUp.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {countries} from "../utils/cityList";

const Signup = ({retailer}) => {

    countries[0].name = "India";

    const [country, setCountry] = useState("--Country--");
    const [state, setState] = useState("--State--");
    const [city, setCity] = useState("--City--");
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const changeCountry = (event) => {
        setCountry(event.target.value);
        setStates(countries.find((ctr) => ctr.name === event.target.value).states);
    };

    const [showimg, setShowimg] = useState("");

    const changeState = (event) => {
        setState(event.target.value);
        setCities(states.find((state) => state.name === event.target.value).cities);
    };

    function changeCity(event) {
        setCity(event.target.value);
    }

    const [password, setPassword] = useState("");
    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [altPhone, setAltPhone] = useState("");
    const [vid, setVid] = useState("");

    const navigate = useNavigate();

    const inputRef = useRef();
    const [img, setImg] = useState([]);

    const handleSignUp = (e) => {
        e.preventDefault();

        if (fName.length === 0 || lName.length === 0 || email.length === 0 || phone.length === 0 || state.length === 0 || city.length === 0 || address.length === 0 || pin.length === 0 || gender.length === 0 || password.length === 0 || confirmPassword.length === 0 || vid.length == 0) {
            toast.error("Please fill all the fields");
        } else {
            if (!verified) {
                toast.error("Please verify your email first");
                return;
            }

            if(vid.length != 12) {
                toast.error("Enter a valid VID");
                return;
            }

            if (password === confirmPassword) {
                toast.success("Signing you up");
                if (retailer) {
                    axios
                        .post("/signupr", {
                            fName,
                            lName,
                            email,
                            phone,
                            altPhone,
                            state,
                            city,
                            address,
                            pin,
                            gender,
                            password,
                            vid,
                            profile_image: img,
                            retailer,
                        })
                        .then((obj) => {
                            if (obj.data.error) {
                                toast.error("User already present");
                            } else {
                                toast.success("Sign up successful");
                                navigate("/");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    axios
                        .post("/signupu", {
                            fName,
                            lName,
                            email,
                            phone,
                            altPhone,
                            state,
                            city,
                            address,
                            pin,
                            gender,
                            password,
                            vid,
                            profile_image: img,
                            retailer,
                        })
                        .then((obj) => {
                            if (obj.data.error) {
                                toast.error("User already present");
                            } else {
                                toast.success("Sign up successful");
                                navigate("/");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            } else {
                toast.error("Password and Confirm Password are not matching");
            }
        }
    };

    const setFiletoBase = (file) => {
        const reader = new FileReader();

        // Reader is reading the file
        reader.readAsDataURL(file);

        // Once the reading is completed, onloadend is triggered
        reader.onloadend = () => {
            setImg(reader.result);
        };
    };

    const verifyEmail = () => {
        if (email.length === 0) {
            toast.error("Please fill the email first");
            return;
        }
        axios.post('/verifyemail', {email})
            .then((obj) => {
                setOtp(obj.data.otp);
            })
            .catch((error) => {
                console.log(error);
            })
        setShowDialog(true);
    }

    const acceptedTypes = ["image/jpeg", "image/png"];

    const handleImageSubmission = (e) => {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            // Checking if the file is an image or not
            if (acceptedTypes.includes(image["type"])) {
                setFiletoBase(image);
                setShowimg({
                    image: URL.createObjectURL(image),
                });
            } else {
                setImg([]);
            }
        }
    };

    const [otp, setOtp] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const [verified, setVerified] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <div className="bg-grey-lighter flex flex-col mx-auto w-[70%]">
                <h1 className="text-4xl font-semibold text-white mx-auto text-center my-5">
                    Signup Page
                </h1>

                <form>
                    <div className="mx-auto grid grid-rows-1 mb-2">
                        <div className="border-b border-gray-900/10 grid-cols-2">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
                                <div className="col-span-2 px-[2rem] grid place-items-center">
                                    <div
                                        id="profile-container"
                                        className="mt-4 cursor-pointer border-white border-2 bg-gray-200"
                                        onClick={() => {
                                            inputRef.current.click();
                                        }}
                                    >
                                        {showimg && (
                                            <img
                                                src={showimg.image}
                                                alt="Profile"
                                                id="profileImage"
                                                className="h-[100%] w-[100%]"
                                            />
                                        )}
                                    </div>
                                    <br/>
                                    <label className="text-white text-sm font-semibold">
                                        Upload your Picture Here
                                    </label>

                                    <input
                                        type="file"
                                        name="profile-file"
                                        className={"hidden"}
                                        ref={inputRef}
                                        onChange={handleImageSubmission}
                                    />
                                </div>

                                <div className="grid-rows-1 col-span-3 w-full sm:w-[80%] sm:ml-[2rem] md:w-[75%]">
                                    <div className="sm:col-span-3 md:col-span-3 my-[24px]">
                                        <label
                                            htmlFor="first-name"
                                            className="block text-sm leading-6 text-white font-semibold"
                                        >
                                            First Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                placeholder="First Name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => {
                                                    setFname(e.target.value);
                                                }}

                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 md:col-span-3">
                                        <label
                                            htmlFor="last-name"
                                            className="block text-sm leading-6 text-white font-semibold"
                                        >
                                            Last Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                placeholder="Last Name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => {
                                                    setLname(e.target.value);
                                                }}

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mx-auto grid grid-rows-1">
                        <div className="border-b border-gray-900/10 pb-12 grid-cols-2">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Email ID
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email ID"
                                            autoComplete="email"
                                            className="inline w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}

                                        />
                                        {verified ? (
                                            <span className={"text-green-400 mt-4 cursor-pointer"}>Verified</span>
                                        ) : (
                                            <span className={"text-white mt-4 cursor-pointer"}
                                                  onClick={verifyEmail}>Verify</span>
                                        )}

                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Contact Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="contact"
                                            placeholder="Primary Number"
                                            name="contact"
                                            type="contact"
                                            autoComplete="contact"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                            }}

                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Alternate Contact Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="contact"
                                            name="contact"
                                            type="contact"
                                            placeholder="Alternate Number"
                                            autoComplete="contact"
                                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setAltPhone(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="country"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Country
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={country}
                                            onChange={changeCountry}
                                        >
                                            <option>--Country--</option>
                                            {countries.map((ctr) => (
                                                <option value={ctr.name}>{ctr.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="state"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        State
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            name="state"
                                            id="state"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={state}
                                            onChange={changeState}
                                        >
                                            <option>--State--</option>
                                            {states.map((state) => (
                                                <option value={state.name}>{state.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-2 ">
                                    <label
                                        htmlFor="city"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            name="city"
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={city}
                                            onChange={changeCity}
                                        >
                                            <option>--City--</option>
                                            {cities.map((city) => (
                                                <option value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="street-address"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            name="street-address"
                                            id="street-address"
                                            autoComplete="street-address"
                                            placeholder=" Enter your Complete Address..."
                                            className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setAddress(e.target.value);
                                            }}

                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="postal-code"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        ZIP / Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="postal-code"
                                            id="postal-code"
                                            placeholder="PIN Code"
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setPin(e.target.value);
                                            }}

                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="password"
                                            placeholder=" Enter your password..."
                                            className="block w-full rounded-md p-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}

                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="mt-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Re-enter Passowrd"
                                            autoComplete="password"
                                            className="block w-full rounded-md p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                            }}

                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="vid"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        VID
                                    </label>
                                    <div className="mt-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                                        <input
                                            type="vid"
                                            name="vid"
                                            id="vid"
                                            placeholder="VID"
                                            autoComplete="vid"
                                            className="block w-full rounded-md p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setVid(e.target.value);
                                            }}

                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="gender"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Gender
                                    </label>
                                    <span className="text-white border-2 rounded px-3 py-1 mr-[2rem]">
                                    Male{"  "}
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            className="mt-4"
                                            onChange={(e) => {
                                                setGender(e.target.value);
                                            }}

                                        />
                                </span>
                                    <span className="text-white border-2 rounded px-3 py-1">
                                    Female{"  "}
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            className="mt-4"
                                            onChange={(e) => {
                                                setGender(e.target.value);
                                            }}

                                        />
                                </span>
                                </div>

                            </div>

                            <button
                                type="submit"
                                className="mt-[2rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Modal for entering the otp for verifying the email */}
            {showDialog ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-[30rem] my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Enter the OTP
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowDialog(false)}
                                    >
                                        <span
                                            className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                          ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-4 flex-auto">
                                    <form>
                                        <input required
                                               className="my-4 p-2 w-full text-slate-500 text-lg rounded-md leading-relaxed"
                                               placeholder="Enter your OTP" name="otp" onChange={(e) => {
                                            setEnteredOtp(e.target.value);
                                        }}/>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowDialog(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            if (otp === enteredOtp) {
                                                setVerified(true);
                                            } else {
                                                toast.error("Invalid OTP");
                                            }
                                            setShowDialog(false);
                                        }}
                                        disabled={enteredOtp.length === 0}
                                    >
                                        Verify Email
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default Signup;
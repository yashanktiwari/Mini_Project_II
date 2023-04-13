import {useState, useRef} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import '../css/SignUp.css'


const Signup = () => {
    const [password, setPassword] = useState("");
    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [altPhone, setAltPhone] = useState("");

    const navigate = useNavigate();

    const inputRef = useRef();
    const [img, setImg] = useState();

    const handleSignUp = (e) => {
        e.preventDefault();
        axios.post('/signup', { fName, lName, email, phone, altPhone, city, address, state, pin, gender, password})
            .then((obj) => {
                if (obj.data.errorMsg) {
                    console.log("User already there in the db");
                } else {
                    console.log("User created");
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleImageSubmission = (e) => {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            setImg({
                img: URL.createObjectURL(image)
            })
        }
    }

    return (
        <>
            {/* Write the html code here */}
            {/*<h1>Hello from Signup</h1>*/}
            {/*<form method="post" onSubmit={handleSignUp}>*/}
            {/*    <input className="border border-black" type="text" name="username" onChange={(e) => {*/}
            {/*        setUsername(e.target.value);*/}
            {/*    }}/>*/}

            {/*    <input className="border border-black" type="password" name="password" onChange={(e) => {*/}
            {/*        setPassword(e.target.value);*/}
            {/*    }} />*/}
            {/*    <button className="border border-black" type="submit">Sign Up</button>*/}
            {/*</form>*/}


            <div className="bg-grey-lighter flex flex-col mx-auto w-[90%] items-center justify-center">
                <h1 className="text-4xl font-semibold text-blue-700">SignUp Page</h1>

                <form onSubmit={handleSignUp}>
                <div className="mx-auto flex-1 flex flex-col">

                        <div className="border-b border-gray-900/10 pb-12 flex-col flex items-center">

                            <div>

                                <div id="profile-container" className="cursor-pointer border border-black"
                                     onClick={() => {
                                         inputRef.current.click()
                                     }
                                     }>
                                    {img && (
                                        <img src={img.img} id="profileImage" className="h-[100%] w-[100%]"/>
                                    )}
                                </div>
                                <br/>
                                <label>Upload your Picture Here</label>

                                <br/>
                                <br/>
                                <input type="file" name="profile-file" className={"hidden"} ref={inputRef}
                                       onChange={handleImageSubmission} required/>
                            </div>


                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setFname(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setLname(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="email"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Contact Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="contact"
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


                                <div className="sm:col-span-3">
                                    <label htmlFor="country"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Country
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>India</option>

                                        </select>
                                    </div>
                                </div>

                                <fieldset className="p-4">
                                    <div>
                                        <legend className="font-bold">Gender</legend>
                                    </div>
                                    <div className="inline-flex">
                                        <label
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 cursor-pointer rounded-l"
                                            htmlFor="male">Male</label>
                                        <input className="hidden" type="radio" id="female" value="female"
                                               name="gender" onChange={(e) => {
                                            setGender(e.target.value);
                                        }}/>

                                        <input className="hidden" type="radio" id="female" value="female"
                                               name="gender" onChange={(e) => {
                                            setGender(e.target.value);
                                        }}/>
                                        <label
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 cursor-pointer rounded-r"
                                            htmlFor="female">Female</label>
                                    </div>
                                </fieldset>

                                <div className="col-span-full">
                                    <label htmlFor="street-address"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            type="text"
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

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setCity(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="region"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        State / Province
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="region"
                                            id="region"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setState(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="postal-code"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        ZIP / Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="postal-code"
                                            id="postal-code"
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setPin(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-gray-900">
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
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm Password
                                    </label>
                                    <div className="mt-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="password"
                                            className="block w-full rounded-md p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                            }}
                                        />
                                        <div className="h-4 w-4">
                                            <a href="https://www.freepnglogos.com/pics/dot" title="Image from freepnglogos.com"><img src="https://www.freepnglogos.com/uploads/dot-png/neon-green-dot-clip-art-clkerm-vector-clip-art-33.png" width="200" alt="neon green dot clip art clkerm vector clip art" /> </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="email"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Alternate Contact Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="contact"
                                            name="contact"
                                            type="contact"
                                            autoComplete="contact"
                                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {
                                                setAltPhone(e.target.value);
                                            }}
                                        />
                                    </div>

                                </div>

                                <br/>

                            </div>
                            <br/>
                            {password === confirmPassword ? <button type="submit"
                                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSignUp}>
                                Sign Up

                            </button> : null}
                        </div>

                </div>
                </form>
            </div>
        </>
    )
};

export default Signup;
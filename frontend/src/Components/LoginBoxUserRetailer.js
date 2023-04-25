import React, {useState} from "react";

import {Tab} from "@headlessui/react";
// Initialization for ES Users
import {Ripple, Input, initTE} from "tw-elements";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

initTE({Ripple, Input});

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const LoginBoxRetailerUser = () => {
    const [otpu, setOtpu] = useState("");
    const [otpr, setOtpr] = useState("");

    const [otpVerifiedu, setOtpVerifiedu] = useState(false);
    const [otpVerifiedr, setOtpVerifiedr] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [otpDialogu, setOtpDialogu] = useState(false);
    const [otpDialogr, setOtpDialogr] = useState(false);

    const [useremailu, setUseremailu] = useState("");
    const [passwordu, setPasswordu] = useState("");

    const [useremailr, setUseremailr] = useState("");
    const [passwordr, setPasswordr] = useState("");

    const [forgotemailu, setForgotEmailu] = useState("");
    const [forgotemailr, setForgotEmailr] = useState("");

    const navigate = useNavigate();

    const handleULogin = (e) => {
        e.preventDefault();
        axios.post('/loginu', {useremail: useremailu, password: passwordu, retailer: false})
            .then((obj) => {
                if (!obj.data.userObj) {
                    toast.error(obj.data.error);
                    // console.log(obj.data.error);
                } else {
                    if (!obj.data.userObj.message) {
                        localStorage.setItem('isLoggedIn', JSON.stringify(obj.data.token));

                        setTimeout(() => {
                            toast.success("Login Successful");
                            navigate('/dashboard');
                        }, 1000);
                    } else {
                        toast.error(obj.data.error);
                        // console.log(obj.data.error);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleRLogin = (e) => {
        e.preventDefault();
        axios.post('/loginr', {useremail: useremailr, password: passwordr, retailer: true})
            .then((obj) => {
                if (!obj.data.userObj) {
                    toast.error(obj.data.error);
                    // console.log(obj.data.error);
                } else {
                    if (!obj.data.userObj.message) {
                        localStorage.setItem('isLoggedIn', JSON.stringify(obj.data.token));

                        setTimeout(() => {
                            toast.success("Login Successful");
                            navigate('/dashboard');
                        }, 1000);
                    } else {
                        toast.error(obj.data.error);
                        // console.log(obj.data.error);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const [showModalu, setShowModalu] = React.useState(false);
    const [showModalr, setShowModalr] = React.useState(false);

    const handleUForgotPassword = (e) => {
        axios.post('/forgotpasswordu', {email: forgotemailu, retailer: false})
            .then((obj) => {
                // console.log(obj);
                if (!obj.data._id) {
                    toast.error("User not found");
                    // console.log("User not found");
                } else {
                    // User found and otp sent successfully
                    toast.success("OTP sent successfully");
                    // console.log("OTP sent yayy");
                    setShowModalu(false);
                    setOtpDialogu(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleRForgotPassword = (e) => {
        axios.post('/forgotpasswordr', {email: forgotemailr, retailer: true})
            .then((obj) => {
                if (!obj.data._id) {
                    toast.error("User not found");
                    // console.log("User not found");
                } else {
                    // User found and otp sent successfully
                    toast.success("OTP sent successfully");
                    // console.log("OTP sent yayy");
                    setShowModalr(false);
                    setOtpDialogr(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleVerifyOTPu = (e) => {
        axios.post('/verifyotpu', {email: forgotemailu, otp: otpu, retailer: false})
            .then((obj) => {
                if (obj.data.success) {
                    //     OTP verified
                    toast.success("OTP verified successfully");
                    setOtpVerifiedu(true);
                } else {
                    //     Incorrect OTP
                    toast.error(obj.data.error);
                    // console.log(obj.data.error);
                }
                setOtpDialogu(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleVerifyOTPr = (e) => {
        axios.post('/verifyotpr', {email: forgotemailr, otp: otpr, retailer: true})
            .then((obj) => {
                if (obj.data.success) {
                    //     OTP verified
                    toast.success("OTP verified successfully");
                    setOtpVerifiedr(true);
                } else {
                    //     Incorrect OTP
                    toast.error(obj.data.error);
                    // console.log(obj.data.error);
                }
                setOtpDialogr(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleUChangePassword = (e) => {
        axios.post('/changepasswordu', {email: forgotemailu, newpassword: newPassword, retailer: false})
            .then((obj) => {
                if (obj.data.success) {
                    toast.success("Password changed successfully");
                    // console.log("Password changed successfully");
                    setOtpVerifiedu(false);
                } else {
                    toast.error(obj.data.error);
                    // console.log(obj.data.error);
                }
            });
    }

    const handleRChangePassword = (e) => {
        axios.post('/changepasswordr', {email: forgotemailr, newpassword: newPassword, retailer: true})
            .then((obj) => {
                if (obj.data.success) {
                    toast.success("Password changed successfully");
                    // console.log("Password changed successfully");
                    setOtpVerifiedr(false);
                } else {
                    toast.error(obj.data.error);
                    // console.log(obj.data.error);
                }
            });
    }

    return (
        <>
            <div className="w-full px-2 py-2.5 sm:px-0">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-white p-1">
                        <Tab
                            className={({selected}) =>
                                classNames(
                                    "w-full font-bold rounded-lg py-2.5 text-md leading-5 text-blue-700",
                                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                    selected
                                        ? "bg-sky-300 shadow"
                                        : "hover:bg-white/[0.12] hover:text-orange-600"
                                )
                            }
                        >
                            User Login
                        </Tab>
                        <Tab
                            className={({selected}) =>
                                classNames(
                                    "w-full rounded-lg py-2.5 text-md font-bold leading-5 text-blue-700",
                                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                    selected
                                        ? "bg-sky-300 shadow"
                                        : "hover:bg-white/[0.12] hover:text-orange-600"
                                )
                            }
                        >
                            Retailer Login
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <form onSubmit={handleULogin}>
                                <div className="mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-md font-bold mt-4 text-white"
                                    >
                                        User Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="User Email"
                                        required
                                        name="useremail"
                                        onChange={(e) => {
                                            setUseremailu(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-md font-bold text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-medium dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Password"
                                        required
                                        name="password"
                                        onChange={(e) => {
                                            setPasswordu(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="flex items-start mb-6">
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 text-md font-bold text-white mx-auto self-end hover:underline"
                                    >
                                        <span className="cursor-pointer" onClick={() => {
                                            setShowModalu(true);
                                        }}>Forgot Password ?</span>
                                    </label>
                                </div>
                                <div className="flex items-start mb-6">
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 text-md font-medium text-white mx-auto self-end"
                                    >
                                        <span className="font-bold text-md ">
                                            Not Registered Yet ?{" "}
                                            <Link to='/signupu' className="ml-1 text-cyan-300 hover:underline">
                                                Create User Account
                                            </Link>
                                        </span>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-md w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Login
                                </button>
                            </form>
                        </Tab.Panel>
                        <Tab.Panel>
                            <form onSubmit={handleRLogin}>
                                <div className="mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-md font-bold mt-4 text-white"
                                    >
                                        Retailer Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Retailer Email"
                                        required
                                        name="useremailr"
                                        onChange={(e) => {
                                            setUseremailr(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-md font-bold text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Password"
                                        required
                                        name="passwordr"
                                        onChange={(e) => {
                                            setPasswordr(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="flex items-start mb-6">
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 text-md font-bold text-white mx-auto self-end hover:underline"
                                    >
                                        <span className="cursor-pointer" onClick={() => {
                                            setShowModalr(true);
                                        }}>Forgot Password ?</span>
                                    </label>
                                </div>
                                <div className="flex items-start mb-6">
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 text-md font-bold text-white mx-auto self-end"
                                    >
                                <span>
                                    Not Registered Yet ?{" "}
                                    <Link to='/signupr' className="text-cyan-300 hover:underline ml-1">
                                        Create Retailer Account
                                    </Link>
                                </span>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-md w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Login
                                </button>
                            </form>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>

            {/* Modal for user */}
            {showModalu ? (
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
                                        Forgot your password
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModalu(false)}
                                    >
                    <span
                        className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-4 flex-auto">
                                    <input className="my-4 p-2 w-full text-slate-500 text-lg rounded-md leading-relaxed"
                                           placeholder="Enter your email address" name="email" onChange={(e) => {
                                        setForgotEmailu(e.target.value);
                                    }}/>
                                </div>
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModalu(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleUForgotPassword()}
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {/* Modal for retailer */}
            {showModalr ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-[32rem] my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Forgot your password (Retailer)
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModalr(false)}
                                    >
                    <span
                        className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-4 flex-auto">
                                    <input className="my-4 p-2 w-full text-slate-500 text-lg rounded-md leading-relaxed"
                                           placeholder="Enter your email address" name="email" onChange={(e) => {
                                        setForgotEmailr(e.target.value)
                                    }}/>
                                </div>
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModalr(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleRForgotPassword()}
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {/* Enter otp for user */}
            {otpDialogu ? (
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
                                        onClick={() => setOtpDialogu(false)}
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
                                            setOtpu(e.target.value);
                                        }}/>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setOtpDialogu(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            handleVerifyOTPu()
                                        }}
                                        disabled={otpu.length === 0}
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {/* Enter otp for retailer */}
            {otpDialogr ? (
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
                                        onClick={() => setOtpDialogr(false)}
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
                                        <input
                                            required
                                            className="my-4 p-2 w-full text-slate-500 text-lg rounded-md leading-relaxed"
                                            placeholder="Enter your OTP" name="otp" onChange={(e) => {
                                            setOtpr(e.target.value);
                                        }}/>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setOtpDialogr(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        disabled={otpr.length === 0}
                                        onClick={() => {
                                            handleVerifyOTPr();
                                        }}
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {/* New Password dialog for user */}
            {otpVerifiedu ? (
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
                                        New Password
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setOtpVerifiedu(false)}
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
                                        <input required type="password"
                                               className="my-4 p-2 w-full text-slate-500 text-lg rounded-md leading-relaxed"
                                               placeholder="New Password" name="newpassword" onChange={(e) => {
                                            setNewPassword(e.target.value);
                                        }}/>
                                        <input required type="password"
                                               className="my-4 p-2 w-full text-slate-500 text-lg rounded-md leading-relaxed"
                                               placeholder="Confirm New Password" name="newpassword" onChange={(e) => {
                                            setConfirmNewPassword(e.target.value);
                                        }}/>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setOtpVerifiedu(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        disabled={confirmNewPassword !== newPassword || newPassword.length === 0}
                                        onClick={() => {
                                            handleUChangePassword()
                                        }}
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {/* New Password dialog for retailer */}
            {otpVerifiedr ? (
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
                                        New Password
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setOtpVerifiedr(false)}
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
                                        <input required type="password"
                                               className="my-4 p-2 w-full text-slate-500 text-lg rounded-md leading-relaxed"
                                               placeholder="Enter new Password" name="newpassword" onChange={(e) => {
                                            setNewPassword(e.target.value);
                                        }}/>
                                        <input required type="password"
                                               className="my-4 p-2 w-full text-slate-500 text-lg rounded-md leading-relaxed"
                                               placeholder="Enter new Password" name="confirmnewpassword"
                                               onChange={(e) => {
                                                   setConfirmNewPassword(e.target.value);
                                               }}/>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setOtpVerifiedr(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        disabled={confirmNewPassword !== newPassword || newPassword.length === 0}
                                        onClick={() => {
                                            handleRChangePassword()
                                        }}
                                    >
                                        Change Password
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

export default LoginBoxRetailerUser;
import React, {useEffect} from "react";
import LoginBoxUserRetailer from "../Components/LoginBoxUserRetailer";
import LoginPagePara from "../Components/LoginPagePara";
import HomeNavbar from "../Components/HomeNavbar";
import Footer from "../Components/Footer";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("isLoggedIn") !== null) {
            navigate('/dashboard');
        }
    })

    return (
        <>
            <HomeNavbar/>
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
                    url('https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    minHeight: "100vh",
                }}
                className="min-h-fit pb-5"
            >
                <div className="md:grid md:grid-cols-3 md:gap-5 mx-8 pt-4 md:pt-8">
                    <div className="columns-1 col-span-2 bg-transparent rounded-xl p-4 bg-opacity-40">
                        <LoginPagePara/>
                    </div>
                    <div
                    className="md:columns-1 block bg-sky-800 rounded-xl px-4 py-4 bg-opacity-40"
                    role="navigation"
                    >
                        <LoginBoxUserRetailer />
                    </div>
                </div>
            </div>
            <div className="mx-auto">
              <Footer/>
            </div>
        </>
    );
};

export default Login;
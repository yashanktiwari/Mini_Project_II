import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/img/bg_img.jpg";
import HomeNavbar from "../Components/HomeNavbar";
import Footer from "../Components/Footer";

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("isLoggedIn") !== null) {
            navigate('/dashboard');
        }
    })

    return (

        <>
            <body className="bg-cover" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImg})`,
                backgroundRepeat: "no-repeat",
                height: "100vh",
                weight: "100vw"
            }}>
                <HomeNavbar />

                <h1>HomePage</h1>
            </body>
            <Footer />
        </>
    )
};

export default Home;
import {FaBars, FaTimes} from "react-icons/fa";
import {useRef} from "react";
import '../css/HomeNavbar.css';
import logo from '../assets/img/estately-logo.png';
import { Link } from 'react-router-dom';

const HomeNavbar = () => {

    const navRef = useRef();
    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <>
            {/* Write the html code here */}
            <header className="flex items-center">
                <img src={logo} alt="Logo" className="h-[3rem] w-[10rem]"/>
                <nav ref = {navRef} className="pb-4">
                    <Link to="/">Home</Link>
                    <a href="/#">Contact Us!</a>
                    <Link to="/aboutus">About Us!</Link>

                    <button className = "nav-btn nav-close-btn" onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </nav>
                <button className = "nav-btn" onClick={showNavbar}>
                    <FaBars />
                </button>
            </header>
        </>
    )
};

export default HomeNavbar;
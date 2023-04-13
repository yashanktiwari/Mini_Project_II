import {useRef} from "react";
import {FaBars} from "react-icons/fa";
import {useSelector} from "react-redux";
import "../css/CommonNavbar.css";
import logo from '../assets/img/estately-logo.png';
import {Link, useNavigate} from "react-router-dom";

const CommonNavbar = () => {

    const navigate = useNavigate();

    const userStore = useSelector(store => store.user);

    const navRef = useRef();
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    }

    return (
        <>
            {/*    Update*/}
            <header className="flex justify-between">
                <img src={logo} alt="Logo" className="h-[3rem] w-[10rem]"/>

                <nav ref={navRef}>
                    <Link to="/dashboard">Home</Link>
                    <Link to="/contactus">Contact Us!</Link>
                    <Link to="/aboutus">About Us!</Link>
                </nav>

                <div className="dropdown">
                    <div className="myclass">

                        <button className="dropbtn">
                            Hii, {userStore.user.username} !!!
                        </button>

                    </div>
                    <div className="dropdown-content ">
                        <Link to={`/profile/${userStore.user._id}`} className="hover:bg-gray-700"><span className="px-12 py-2">Profile</span></Link>
                        <Link to={`/wishlist/${userStore.user._id}`} className="hover:bg-gray-700"><span className="px-12 py-2">Wishlist</span></Link>
                        <Link onClick={handleLogout} className="hover:bg-gray-700 rounded-b-[12px]"><span className="px-12 py-2">Log Out</span></Link>
                    </div>
                </div>

                <button className="nav-btn" onClick={showNavbar}>
                    <FaBars/>
                </button>
            </header>
            {/*    Update*/}

        </>
    )
};

export default CommonNavbar;
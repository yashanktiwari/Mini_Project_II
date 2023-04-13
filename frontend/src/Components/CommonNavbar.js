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

    return (
        <>
            {/*    Update*/}
            <header className="flex justify-between">
                <img src={logo} alt="Logo" className="h-[3rem] w-[10rem]"/>

                <nav ref={navRef}>
                    <button onClick={(e) => {
                        e.preventDefault();
                        if (userStore.user.role != null) {
                            let flag = userStore.user.role === "retailer";
                            navigate('/dashboard', {state: {retailer: flag}});
                        }

                    }}>Home
                    </button>
                    <Link to="/contactus">Contact Us!</Link>
                    <Link to="/aboutus">About Us!</Link>
                </nav>

                <div className="dropdown">
                    <div className="myclass">

                        <button className="dropbtn">
                            Hii, {userStore.user.username} !!!
                        </button>

                    </div>
                    <div className="dropdown-content">
                        <a href="#">Profile</a>
                        <a href="#">WishList</a>
                        <a href="#">LogOut</a>
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
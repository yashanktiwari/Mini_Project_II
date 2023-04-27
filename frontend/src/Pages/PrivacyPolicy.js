import {useEffect, useRef, useState} from "react";
import HomeNavbar from "../Components/HomeNavbar";
import Footer from "../Components/Footer";
import CommonNavbar from "../Components/CommonNavbar";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import verifyToken from "../utils/verifyToken";

function PrivacyReal() {

    const [token, setToken] = useState();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('isLoggedIn')) {
            setToken(JSON.parse(localStorage.getItem('isLoggedIn')));

            if(token) {
                verifyToken(token, navigate, dispatch);
            }
        }
    }, [token]);


    const privacy = useRef();
    const showNavbar = () => {
        privacy.current.classList.toggle("responsive_nav");
    };

    return (
        <div >
            {localStorage.getItem("isLoggedIn") == null ? <HomeNavbar /> : <CommonNavbar />}
            <section className="bg-gray-900 py-4 px-16 tracking-wide">
            <div className="tracking-tight text-4xl text-center text-sky-400 font-medium mb-4">
                <h1>PRIVACY POLICY</h1>
            </div>

            <div className="text-white">
                <p>
                    At <span className="text-sky-400 font-bold">ESTATELY</span>, we respect your privacy and are committed to
                    protecting the personal information that you provide to us. With the new
                    Privacy Policy explains how we collect, use, and disclose your
                    personal information when you use our website. By using our website,
                    you consent to the collection, use, and disclosure of your personal
                    information as described in this Privacy Policy.
                </p>
            </div>

            <div className="text-xl text-sky-400 font-bold mt-5 mb-2">
                <h3>Information We Collect</h3>
            </div>

            <div className="text-white">
                <p>
                    We collect personal information that you provide to us when you use our website, such as when you register for an account, submit a contact form, or sign up for our newsletter. This information may include your name, email address, phone number, and other contact details.
                    In addition, we may collect certain information automatically when you use our website, such as your IP address, browser type, device type, and operating system.
                </p>
            </div>

            <div className="text-xl text-sky-400 font-bold mt-5 mb-2">
                <h3>How We Use Your Information</h3>
            </div>

            <div className="text-white">
                <p>
                    We use the personal information that we collect to provide you with the services that you request, such as responding to your inquiries or providing you with information about properties that meet your criteria.
                    We may also use your personal information to send you marketing communications, such as newsletters or promotional offers, that we believe may be of interest to you. You can opt-out of receiving these communications at any time by following the instructions included in the communication.
                </p>
            </div>

            <div className="text-xl text-sky-400 font-bold mt-5 mb-2">
                <h3>Information Sharing and Disclosure</h3>
            </div>

            <div className="text-white">
                <p>
                    We may share your personal information with third-party service providers that help us to provide our services, such as website hosting, email delivery, and customer support. These service providers are required to protect your personal information and are not authorized to use or disclose your information for any purpose other than providing services to us.
                    We may also disclose your personal information if required to do so by law, or if we believe in good faith that such disclosure is necessary to comply with legal obligations or to protect our rights or property.
                </p>
            </div>

            <div className="text-xl text-sky-400 font-bold mt-5 mb-2">
                <h3>Security And Children's Privacy</h3>
            </div>

            <div className="text-white">
                <p>
                    Our website is not intended for use by children under the age of 18, and we do not knowingly collect personal information from children under the age of 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can delete the information.<br>
                </br>
                    We may update this Privacy Policy from time to time to reflect changes to our practices or to comply with legal obligations. We will notify you of any material changes by posting the updated policy on our website and updating the effective date.
                </p>
            </div>

                <div className="tracking-tight text-4xl text-center text-sky-400 font-medium mb-4">
                    <h1>Contact Us</h1>
                </div>

            <div className="text-white">
                <p>
                    If you have any questions or concerns about our Privacy Policy, or if you would like to access or delete your personal information, please contact us at  <span className="mail hover:underline text-red-600"><a href="#"> assist.estately@gmail.com</a></span>
                </p>
            </div>
            </section>
            <Footer/>
        </div>
    );
}
export default PrivacyReal;
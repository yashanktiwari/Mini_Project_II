import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../css/PrivacyPolicy.css";
import HomeNavbar from "../Components/HomeNavbar";
import Footer from "../Components/Footer";

function PrivacyReal() {
    const privacy = useRef();
    const showNavbar = () => {
        privacy.current.classList.toggle("responsive_nav");
    };

    return (
        <div>
            <HomeNavbar/>
            <section className="bg-gray-900 py-4 px-16">
            <div className="main tracking-tight">
                <h1>PRIVACY POLICY</h1>
            </div>

            <div className="main1">
                <p>
                    At <span className="main2">ESTATELY</span>, we respect your privacy and are committed to
                    protecting the personal information that you provide to us. With the new
                    Privacy Policy explains how we collect, use, and disclose your
                    personal information when you use our website. By using our website,
                    you consent to the collection, use, and disclosure of your personal
                    information as described in this Privacy Policy.
                </p>
            </div>

            <div className="main4">
                <h3>Information We Collect</h3>
            </div>

            <div className="main5">
                <p>
                    We collect personal information that you provide to us when you use our website, such as when you register for an account, submit a contact form, or sign up for our newsletter. This information may include your name, email address, phone number, and other contact details.
                    In addition, we may collect certain information automatically when you use our website, such as your IP address, browser type, device type, and operating system.
                </p>
            </div>

            <div className="main6">
                <h3>How We Use Your Information</h3>
            </div>

            <div className="main7">
                <p>
                    We use the personal information that we collect to provide you with the services that you request, such as responding to your inquiries or providing you with information about properties that meet your criteria.
                    We may also use your personal information to send you marketing communications, such as newsletters or promotional offers, that we believe may be of interest to you. You can opt-out of receiving these communications at any time by following the instructions included in the communication.
                </p>
            </div>

            <div className="main8">
                <h3>Information Sharing and Disclosure</h3>
            </div>

            <div className="main9">
                <p>
                    We may share your personal information with third-party service providers that help us to provide our services, such as website hosting, email delivery, and customer support. These service providers are required to protect your personal information and are not authorized to use or disclose your information for any purpose other than providing services to us.
                    We may also disclose your personal information if required to do so by law, or if we believe in good faith that such disclosure is necessary to comply with legal obligations or to protect our rights or property.
                </p>
            </div>

            <div className="main10">
                <h3>Security And Children's Privacy</h3>
            </div>

            <div className="main11">
                <p>
                    Our website is not intended for use by children under the age of 18, and we do not knowingly collect personal information from children under the age of 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can delete the information.<br>
                </br>
                    We may update this Privacy Policy from time to time to reflect changes to our practices or to comply with legal obligations. We will notify you of any material changes by posting the updated policy on our website and updating the effective date.
                </p>
            </div>

            <div className="main12 tracking-tight">
                <h3>Contact Us</h3>
            </div>

            <div className="main13">
                <p>
                    If you have any questions or concerns about our Privacy Policy, or if you would like to access or delete your personal information, please contact us at <span className="mail hover:underline"><a href="#">assist.estately@gmail.com</a></span>.
                </p>
            </div>
            </section>
            <Footer/>
        </div>
    );
}
export default PrivacyReal;
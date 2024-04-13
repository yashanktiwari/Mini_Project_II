import {useEffect, useRef, useState} from "react";
import HomeNavbar from "../Components/HomeNavbar";
import Footer from "../Components/Footer";
import CommonNavbar from "../Components/CommonNavbar";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import verifyToken from "../utils/verifyToken";

function TermsAndConiditions() {

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
        <>
            {localStorage.getItem("isLoggedIn") == null ? <HomeNavbar /> : <CommonNavbar />}
            <section className="bg-gray-900 py-4 px-4 md:px-16 tracking-wide">
                <div className="tracking-tight text-2xl md:text-4xl text-center text-sky-400 font-medium mb-4">
                    <h1>TERMS & CONDITIONS</h1>
                </div>

                <div className="text-white text-justify">
                    <p>
                        Welcome to <span className="text-sky-400 font-bold">ESTATELY</span>,
                        which helps you to book and purchase a deemed property at low costs.
                    </p>
                </div>

                <div className="text-xl text-sky-400 font-bold mt-5 mb-2">
                    <h3>Property Information Accuracy</h3>
                </div>

                <div className="text-white text-justify">
                    <p>
                        While we make every effort to provide accurate information about
                        properties listed on our website, we cannot guarantee the accuracy of
                        all information. We recommend that you verify all property information
                        before making any decisions based on it.
                    </p>
                </div>

                <div className="text-xl text-sky-400 font-bold mt-5 mb-2">
                    <h3>User Responsibilities</h3>
                </div>

                <div className="text-white text-justify">
                    <p>
                        You are responsible for any actions you take on our website, including
                        making offers on properties, entering into contracts, and providing in
                        un-accurate information. You agree to use our website in a responsible
                        manner and to abide by all applicable laws and regulations.
                    </p>
                </div>

                <div className="text-xl text-sky-400 font-bold mt-5 mb-2">
                    <h3>Third-Party Websites and Services</h3>
                </div>

                <div className="text-white text-justify">
                    <p>
                        Our website may contain links to third-party websites or services. We
                        are not responsible for the content, accuracy, or availability of
                        these third-party sites or services. You access these sites at your
                        own risk.
                    </p>
                </div>

                <div className="text-xl text-sky-400 font-bold mt-5 mb-2">
                    <h3>User Content And Limitation Of Liability:</h3>
                </div>

                <div className="text-white text-justify">
                    <p>
                        You retain ownership of any content that you submit to our website,
                        including property listings, comments, and reviews. By submitting
                        content to our website, you grant us a non-exclusive, worldwide,
                        royalty-free license to use, copy, modify, and distribute your content
                        for any purpose.<br></br>
                        In no event shall we be liable for any direct, indirect, incidental,
                        special, or consequential damages arising out of or in connection with
                        your use of our website or any property listed on our website. This
                        includes, but is not limited to, damages for loss of profits,
                        goodwill, use, data, or other intangible losses.
                    </p>
                </div>
                <div className="text-xl text-sky-400 font-bold mt-5 mb-2">
                    <h3>Governing Law and Jurisdiction</h3>
                </div>

                <div className="text-white text-justify">
                    <p>
                        These terms and conditions shall be governed by and construed in
                        accordance with the laws of the jurisdiction in which we are located.
                        Any disputes arising out of these terms and conditions shall be
                        resolved in the courts of that jurisdiction.
                    </p>
                </div>
                <div className="text-xl text-sky-400 font-bold mt-5 mb-2">
                    <h3>Changes to Terms and Conditions</h3>
                </div>

                <div className="text-white text-justify">
                    <p>
                        We reserve the right to modify these terms and conditions at any time.
                        Your continued use of our website after any changes to these terms and
                        conditions shall constitute your acceptance of the modified terms.
                    </p>
                </div>

                <div className="tracking-tight text-2xl md:text-4xl text-center my-4 text-sky-400 font-medium">
                    <h3>Contact Us</h3>
                </div>

                <div className="text-white text-justify">
                    <p>
                        If you have any questions or concerns about our TERMS & CONDITIONS,
                        please free feel to ask and contactus! meanwhile you can drop your
                        query at &nbsp;
                        <span className="mail hover:underline text-red-600">
                <a href="mailto:kushagraguptafzd02@gmail.com">
                  assist.estately@gmail.com
                </a>
              </span>
                    </p>
                </div>
            </section>
            <Footer/>
        </>
    );
}
export default TermsAndConiditions;
import HomeNavbar from "../Components/HomeNavbar";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CommonNavbar from "../Components/CommonNavbar";
import Footer from "../Components/Footer";
import verifyToken from "../utils/verifyToken";
import {useDispatch} from "react-redux";

const ContactUs = () => {

    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleQuery = (e) => {
        e.preventDefault();
        axios.post('/contactus', {email, subject, message})
            .then(() => {
                console.log("Email sent");
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const [token, setToken] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem('isLoggedIn')) {
            setToken(JSON.parse(localStorage.getItem('isLoggedIn')));

            if(token) {
                verifyToken(token, navigate, dispatch);
            }
        }
    }, [token]);




    return (
        <>
            {localStorage.getItem("isLoggedIn") == null ? <HomeNavbar /> : <CommonNavbar />}
            <section className="bg-gray-900">
                <div className="py-8 lg:pb-8 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">Contact Us</h2>
                    <p className="mb-8 lg:mb-16 font-light md:text-center text-justify text-gray-500 dark:text-gray-400 sm:text-xl">Got
                        a technical issue? Want to send feedback about a beta feature? Need details about our Business
                        plan? Let us know.</p>
                    <form className="space-y-8">
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-300">Your
                                email</label>
                            <input type="email" name="email" id="email"
                                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                   placeholder="name@gmail.com" required onChange={(e) => {
                                    setEmail(e.target.value)
                                   }
                            }/>
                        </div>
                        <div>
                            <label htmlFor="subject"
                                   className="block mb-2 text-sm font-medium text-gray-300">Subject</label>
                            <input type="text" id="subject" name="subject"
                                   className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                   placeholder="Let us know how we can help you" required onChange={(e) => {
                                   setSubject(e.target.value)}
                            }/>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium text-gray-300">Your
                                message</label>
                            <textarea id="message" rows="6" name="message"
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder="Leave a comment..." onChange={(e) => {
                                      setMessage(e.target.value)}
                            }></textarea>
                        </div>
                        <button type="submit"
                                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                        onClick={handleQuery} >
                            Send message
                        </button>
                    </form>
                </div>
            </section>
            <Footer/>
        </>
    )
};

export default ContactUs;
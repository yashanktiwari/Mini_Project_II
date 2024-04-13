import HomeNavbar from "../Components/HomeNavbar";
import Footer from "../Components/Footer";
import CommonNavbar from "../Components/CommonNavbar";
import namanPic from "../assets/img/Naman.jpg";
import anujPic from "../assets/img/Anuj.jpeg";
import yashankPic from "../assets/img/Yashank.jpeg";
import kushagraPic from "../assets/img/Kushagra.jpeg";
import {useEffect, useState} from "react";
import verifyToken from "../utils/verifyToken";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
const AboutUs = () => {

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

    return (
        <>
            {localStorage.getItem("isLoggedIn") == null ? <HomeNavbar /> : <CommonNavbar />}
            <section className="bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:pb-16 lg:px-6 ">
                    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">Our
                            Team</h2>
                        <p className="font-light lg:mb-16 sm:text-xl text-gray-400">
                            Here at Estately we focus on providing the best services to our customers.
                        </p>
                    </div>
                    <div className="grid gap-10 mb-6 lg:mb-16 sm:grid-cols-1 lg:grid-cols-2">
                        <div
                            className="mx-8 md:mx-auto items-center rounded-lg shadow sm:flex bg-gray-800 border-gray-700 overflow-hidden">
                            <a href="#">
                                <div className="overflow-hidden justify-around flex">
                                    <img className="scale-110 hover:scale-125 transition-all duration-500 rounded-lg  sm:rounded-none sm:rounded-l-lg w-[16rem] h-[13rem]"
                                         src={yashankPic}
                                         alt="Yashank Tiwari" />
                                </div>
                            </a>
                            <div className="p-5">
                                <h3 className="text-xl font-bold tracking-tight text-white">
                                    <a href="#">Yashank Tiwari</a>
                                </h3>
                                <span className="text-gray-400">Full Stack Web Developer</span>
                                <p className="mt-3 mb-4 font-light text-gray-400">Worked on the Backend and manages storage space</p>
                                <ul className="flex space-x-4 sm:mt-0">
                                    <li>
                                        <a target={"_blank"} href="https://www.instagram.com/_yashank_t/" className=" text-white dark:hover:text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 bg-gradient-to-b from-[#405DE6] via-[#833AB4] via-[#C13584] via-[#E1306C] via-[#FD1D1D] via-[#F56040] to-[#FFDC80] rounded-md"
                                                fill="currentColor"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a target={"_blank"} href="https://twitter.com/yashank_tiwari" className="text-[#00acee] hover:text-white">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                                                 aria-hidden="true">
                                                <path
                                                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a target={"_blank"} href="https://github.com/yashanktiwari" className="text-gray-300 hover:text-white">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                                                 aria-hidden="true">
                                                <path fillRule="evenodd"
                                                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a target={"_blank"} href="https://www.linkedin.com/in/yashank-tiwari/" className="text-blue-500 hover:text-white">
                                            <svg
                                                className="w-5 h-5  fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512">
                                                <path
                                                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="mx-8 md:mx-auto items-center rounded-lg shadow sm:flex bg-gray-800 border-gray-700 overflow-hidden">
                            <a href="#">
                                <div className="overflow-hidden justify-around flex">
                                    <img className="hover:scale-110 transition-all duration-500 w-[18rem] rounded-lg sm:rounded-none sm:rounded-l-lg h-[13rem]"
                                         src={anujPic}
                                         alt="Anuj Ruhela" />
                                    </div>
                            </a>
                            <div className="p-5">
                                <h3 className="text-xl font-bold tracking-tight text-white">
                                    <a href="#">Anuj Ruhela</a>
                                </h3>
                                <span className="text-gray-400">Full Stack Web Developer</span>
                                <p className="mt-3 mb-4 font-light text-gray-400">Constructed the website structure and worked on the web-end design </p>
                                <ul className="flex space-x-4 sm:mt-0">
                                    <li>
                                        <a target={"_blank"} href="https://www.instagram.com/anuj.7777/" className=" text-white hover:text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 bg-gradient-to-b from-[#405DE6] via-[#833AB4] via-[#C13584] via-[#E1306C] via-[#FD1D1D] via-[#F56040] to-[#FFDC80] rounded-md"
                                                fill="currentColor"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a target={"_blank"} href="https://twitter.com/anuj3002" className="text-[#00acee] hover:text-white">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                                                 aria-hidden="true">
                                                <path
                                                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a target={"_blank"} href="https://github.com/AnujRuhela7" className="text-gray-300 hover:text-white">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                                                 aria-hidden="true">
                                                <path fillRule="evenodd"
                                                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a target={"_blank"} href="https://www.linkedin.com/in/anuj-ruhela/" className="text-blue-500 hover:text-white">
                                            <svg
                                                className="w-5 h-5  fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512">
                                                <path
                                                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="mx-8 md:mx-auto items-center rounded-lg shadow sm:flex bg-gray-800 border-gray-700 overflow-hidden">
                            <a href="#">
                                <div className="overflow-hidden justify-around flex">
                                    <img className="scale-110 hover:scale-125 transition-all duration-500 rounded-lg sm:rounded-none sm:rounded-l-lg w-[16rem] h-[13rem]"
                                         src={namanPic}
                                         alt="Naman Saini" />
                                </div>
                            </a>
                            <div className="p-5">
                                <h3 className="text-xl font-bold tracking-tight text-white">
                                    <a href="#">Naman Saini</a>
                                </h3>
                                <span className="text-gray-400">Full Stack Web Developer</span>
                                <p className="mt-3 mb-4 font-light text-gray-400">Worked as Frontend Developer and manages social relations</p>
                                <ul className="flex space-x-4 sm:mt-0">
                                    <li>
                                        <a target={"_blank"} href="https://www.instagram.com/saini_naman_18/" className=" text-white hover:text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 bg-gradient-to-b from-[#405DE6] via-[#833AB4] via-[#C13584] via-[#E1306C] via-[#FD1D1D] via-[#F56040] to-[#FFDC80] rounded-md"
                                                fill="currentColor"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a target={"_blank"} href="https://twitter.com/namansaini45" className="text-[#00acee] hover:text-white">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                                                 aria-hidden="true">
                                                <path
                                                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a target={"_blank"} href="https://github.com/NamanSaini18" className="text-gray-300 hover:text-white">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                                                 aria-hidden="true">
                                                <path fillRule="evenodd"
                                                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a target={"_blank"} href="https://www.linkedin.com/in/naman-saini-970924226/" className="text-blue-500 hover:text-white">
                                            <svg
                                                className="w-5 h-5  fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512">
                                                <path
                                                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="mx-8 md:mx-auto items-center rounded-lg shadow sm:flex bg-gray-800 border-gray-700 overflow-hidden">
                            <a href="#">
                                <div className="overflow-hidden mx-auto justify-around flex">
                                    <img className="scale-110 hover:scale-125 transition-all duration-500 rounded-lg sm:rounded-none sm:rounded-l-lg w-[16rem] h-[13rem]"
                                         src={kushagraPic}
                                         alt="Kushagra Gupta" />
                                </div>
                            </a>
                            <div className="p-5">
                                <h3 className="text-xl font-bold tracking-tight text-white">
                                    <a href="#">Kushagra Gupta</a>
                                </h3>
                                <span className="text-gray-400">Full Stack Web Developer</span>
                                <p className="mt-3 mb-4 font-light text-gray-400">Worked as Frontend Developer and manages documentation</p>
                                <ul className="flex space-x-4 sm:mt-0">
                                    <li>
                                        <a href="https://instagram.com/kushagra_0228?igshid=ZDdkNTZiNTM=" target="_blank" className=" text-white hover:text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 bg-gradient-to-b from-[#405DE6] via-[#833AB4] via-[#C13584] via-[#E1306C] via-[#FD1D1D] via-[#F56040] to-[#FFDC80] rounded-md"
                                                fill="currentColor"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={"#"} className="text-[#00acee] hover:text-white">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                                                 aria-hidden="true">
                                                <path
                                                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a target={"_blank"} href="https://github.com/kushagra0207" className="text-gray-300 hover:text-white">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                                                 aria-hidden="true">
                                                <path fillRule="evenodd"
                                                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a target={"_blank"} href="https://www.linkedin.com/in/kushagra-gupta-14275322b/" className="text-blue-500 hover:text-white">
                                            <svg
                                                className="w-5 h-5  fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512">
                                                <path
                                                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </>
    )
};

export default AboutUs;
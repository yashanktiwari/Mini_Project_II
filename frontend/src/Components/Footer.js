import { Link } from 'react-router-dom';
import logo from "../assets/img/estately-logo.png"

const Footer = () => {
    return (
        <>
            <footer className="bg-black mx-auto">
                <div className="md:px-10 w-full max-w-screen-xl p-4 py-6 lg:py-8 mx-auto">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <Link to="/" className="flex items-center">
                                <img src={logo} className="hover:scale-125 transition-all duration-500 h-12 mr-3"
                                     alt="Estately Logo"/>
                            </Link>
                        </div>
                        <div className="w-full md:w-1/3 mb-4 flex justify-end">
                            <input className="w-4/5 sm:w-1/2 md:w-3/5 p-2 pl-3 rounded-full inline text-sm mr-4 mb-3" placeholder="Subscribe to our News Letter!"/>
                            <button type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Subscribe
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="grid md:grid-cols-3 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div className="md:ml-4">
                                <h2 className="mb-4 text-sm font-semibold uppercase text-white">Estately</h2>
                                <ul className="text-gray-400 dark:text-gray-400 font-medium">
                                    <li className="mb-2">
                                        <a target={"_blank"} href="https://medium.com/@assist.estately" className="hover:underline">Articles</a>
                                    </li>
                                    <li >
                                        <Link to="/FAQ" className="hover:underline">FAQ</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:ml-4">
                                <h2 className="mb-4 text-sm font-semibold uppercase text-white">Legal</h2>
                                <ul className="text-gray-400 dark:text-gray-400 font-medium">
                                    <li className="mb-2">
                                        <Link to="/privacypolicy" className="hover:underline">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="/termsandcondition" className="hover:underline">Terms &amp; Conditions</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:ml-4">
                                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase text-white">Follow us</h2>
                                <ul className="text-gray-400 dark:text-gray-400 font-medium">
                                    <li className="mb-2">
                                        <a target={"_blank"} className="hover:underline" href="https://medium.com/@assist.estately">Medium</a>
                                    </li>
                                    <li className="mb-2">
                                        <a target={"_blank"} href="https://www.instagram.com/estately_support/"
                                           className="hover:underline ">Instagram</a>
                                    </li>
                                    <li className="mb-2">
                                        <a target={"_blank"} href="https://twitter.com/EstatelyAssist"
                                           className="hover:underline ">Twitter</a>
                                    </li>
                                    <li>
                                        <a target={"_blank"} href="https://discord.com/channels/1097948836904837302/1097948837420732500" className="hover:underline">Discord</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
                    <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a
              href="https://flowbite.com/" className="hover:underline">Estately™</a>. All Rights Reserved.
          </span>
                        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                            <a href="#" className="bg-gradient-to-b from-[#17A9FD] via-[#0165E1] hover:text-white rounded-lg">

                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd"
                                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="sr-only">Facebook page</span>
                            </a>
                            <a target={"_blank"} href="https://www.instagram.com/estately_support/" className="bg-gradient-to-b from-[#405DE6] via-[#833AB4] via-[#C13584] via-[#E1306C] via-[#FD1D1D] via-[#F56040] to-[#FFDC80] rounded-md hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd"
                                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="sr-only">Instagram page</span>
                            </a>
                            <a target={"_blank"} href="https://twitter.com/EstatelyAssist" className="text-[#00acee] hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                                </svg>
                                <span className="sr-only">Twitter page</span>
                            </a>
                            <a target={"_blank"} href="https://github.com/yashanktiwari/Mini_Project_II" className="text-gray-500 hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd"
                                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="sr-only">GitHub account</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
};

export default Footer;
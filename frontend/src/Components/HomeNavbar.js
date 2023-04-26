import {Fragment, useRef} from "react";
import '../css/HomeNavbar.css';
import logo from '../assets/img/estately-logo.png';
import {Link} from 'react-router-dom';
import {Menu, Transition} from "@headlessui/react";
import {BsList} from "react-icons/bs";

const HomeNavbar = () => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            {/* Write the html code here */}
            <header className="flex sticky top-0 w-full">
                <img src={logo} alt="Logo" className="h-[3rem] w-[10rem]"/>

                <div className={"min-[300px]:hidden md:hidden min-w-[30rem] lg:flex justify-between"}>
                    <Link to="/">Home</Link>
                    <Link to="/contactus">Contact Us</Link>
                    <Link to="/aboutus">About Us</Link>
                </div>

                <div className={"w-[5rem] bg-transparent"}></div>
                <Menu as="div" className="min-[300px]:inline-block lg:hidden relative text-left">
                    <div>
                        <Menu.Button
                            className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm">
                            <BsList className="-mr-1 h-7 w-7 text-gray-100" aria-hidden="true"/>
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-b-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            to={'/'}
                                            className={classNames(
                                                active ? 'bg-gray-500 text-gray-100' : 'text-gray-100',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Home
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            to={'/contactus'}
                                            className={classNames(
                                                active ? 'bg-gray-500 text-gray-100' : 'text-gray-100',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Contact Us
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            to={'/aboutus'}
                                            className={classNames(
                                                active ? 'bg-gray-500 text-gray-100' : 'text-gray-100',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            About Us
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </header>
        </>
    )
};

export default HomeNavbar;
import {Fragment} from "react";
import {AiFillCaretDown} from "react-icons/ai"
import {BsList} from "react-icons/bs"
import {useSelector} from "react-redux";
import logo from '../assets/img/estately-logo.png';
import {Link, useNavigate} from "react-router-dom";
import {Menu, Transition} from '@headlessui/react'

const CommonNavbar = () => {

    const navigate = useNavigate();

    const userStore = useSelector(store => store.user);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            {/*    Update*/}
            <header className="flex sticky z-50 top-0 justify-between">
                <img src={logo} alt="Logo" className="h-[3rem] w-[10rem]"/>

                <div className={"min-[300px]:hidden md:hidden min-w-[30rem] lg:flex justify-between"}>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/contactus">Contact Us</Link>
                    <Link to="/aboutus">About Us</Link>
                    {userStore.user.role === "retailer" ? (
                        <Link to="/addnewproperty">List new property</Link>
                    ) : null}
                </div>

                <Menu as="div" className="min-[300px]:hidden md:hidden lg:inline-block relative text-left">
                    <div>
                        <Menu.Button
                            className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm">
                            {userStore.user.profile_image ? (
                                <img src={userStore.user.profile_image} alt="Profile Image" className="w-12 mr-2 h-12 rounded-full"/>
                            ) : null}
                            <span>Hi!! {userStore.user.username}</span>
                            <AiFillCaretDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                                            to={`/profile/${userStore.user._id}`}
                                            className={classNames(
                                                active ? 'bg-gray-500 text-gray-100' : 'text-gray-100',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            My Profile
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            to={`/wishlist/${userStore.user._id}`}
                                            className={classNames(
                                                active ? 'bg-gray-500 text-gray-100' : 'text-gray-100',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Wishlist
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <button
                                            onClick={handleLogout}
                                            className={classNames(
                                                active ? 'bg-gray-500 text-gray-100' : 'text-gray-100',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>


                <Menu as="div" className="min-[300px]:inline-block lg:hidden relative text-left">
                    <div>
                        <Menu.Button
                            className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm">
                            <BsList className="-mr-1 h-7 w-7 text-gray-100" aria-hidden="true" />
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
                                            to={'/dashboard'}
                                            className={classNames(
                                                active ? 'bg-gray-500 text-gray-100' : 'text-gray-100',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Dashboard
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
                                {
                                    userStore.user.role === "retailer" ? (
                                            <Menu.Item>
                                                {({active}) => (
                                                    <Link
                                                        to={'/addnewproperty'}
                                                        className={classNames(
                                                            active ? 'bg-gray-500 text-gray-100' : 'text-gray-100',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        List New Property
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                    ) : null
                                }
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            to={`/profile/${userStore.user._id}`}
                                            className={classNames(
                                                active ? 'bg-gray-500 text-gray-100' : 'text-gray-100',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            My Profile
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            to={`/wishlist/${userStore.user._id}`}
                                            className={classNames(
                                                active ? 'bg-gray-500 text-gray-100' : 'text-gray-100',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Wishlist
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <button
                                            onClick={handleLogout}
                                            className={classNames(
                                                active ? 'bg-gray-500 text-gray-100' : 'text-gray-100',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                        >
                                            Sign out
                                        </button>
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

export default CommonNavbar;
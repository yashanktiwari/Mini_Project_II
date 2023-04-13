import React from "react";

import { Tab } from "@headlessui/react";
// Initialization for ES Users
import { Ripple, Input, initTE } from "tw-elements";

initTE({ Ripple, Input });

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
const LoginBoxRetailerUser = () => {
    return (
        <>
            <div className="w-full max-w-md px-2 py-2.5 sm:px-0">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-white p-1">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-full font-bold rounded-lg py-2.5 text-md leading-5 text-blue-700",
                                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                    selected
                                        ? "bg-sky-300 shadow"
                                        : "hover:bg-white/[0.12] hover:text-orange-600"
                                )
                            }
                        >
                            User Login
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-full rounded-lg py-2.5 text-md font-bold leading-5 text-blue-700",
                                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                    selected
                                        ? "bg-sky-300 shadow"
                                        : "hover:bg-white/[0.12] hover:text-orange-600"
                                )
                            }
                        >
                            Retailer Login
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <form>
                                <div className="mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-md font-bold mt-4 text-gray-900 dark:text-white"
                                    >
                                        User ID
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="User ID"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-md font-bold text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        class="bg-gray-50 border border-gray-300 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-medium dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div className="flex items-start mb-6">
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 text-md font-bold text-gray-900 dark:text-white mx-auto self-end"
                                    >
                                        <a href="#">Forgot Password ?</a>
                                    </label>
                                </div>
                                <div className="flex items-start mb-6">
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 text-md font-medium text-gray-900 dark:text-white mx-auto self-end"
                                    >
                    <span className="font-bold text-md">
                      Not Registered Yet ?{" "}
                        <a href="#" className="text-cyan-300">
                        Create Account
                      </a>
                    </span>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-md w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Login
                                </button>
                            </form>
                        </Tab.Panel>
                        <Tab.Panel>
                            <form>
                                <div className="mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-md font-bold mt-4 text-gray-900 dark:text-white"
                                    >
                                        Retailer ID
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Retailer ID"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-md font-bold text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div className="flex items-start mb-6">
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 text-md font-bold text-gray-900 dark:text-white mx-auto self-end"
                                    >
                                        <a href="#">Forgot Password ?</a>
                                    </label>
                                </div>
                                <div className="flex items-start mb-6">
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 text-md font-bold text-gray-900 dark:text-white mx-auto self-end"
                                    >
                    <span>
                      Not Registered Yet ?{" "}
                        <a href="#" className="text-cyan-300">
                        Create Account
                      </a>
                    </span>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-md w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Login
                                </button>
                            </form>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </>
    );
};

export default LoginBoxRetailerUser;

import {useParams} from "react-router";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import CommonNavbar from "../Components/CommonNavbar";
import Footer from "../Components/Footer";
import verifyToken from "../utils/verifyToken";
import SinglePageCarousel from "../Components/SinglePageCarousel";
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {removeItemFromCart} from "../utils/userSlice";
import Datepicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';


const SinglePropertyPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [token, setToken] = useState();

    const userStore = useSelector(store => store.user);

    const [property, setProperty] = useState({});

    const visitRef = useRef();

    const [dateObj, setDateObj] = useState();
    const [date, setDate] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [timeSlot, setTimeSlot] = useState("");

    function bookAppointment() {
        toggleVisitModal();
        console.log("Date: " + date + ", Month: " + month + ", Year: " + year + ", Time Slot: " + timeSlot + ", Name: " +  fullName);
    }
    function setAppointmentDate(obj) {
        setDateObj(obj);
        setDate(obj.getDate());
        setMonth(obj.getMonth() + 1);
        setYear(obj.getFullYear());
    }
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() + 7);
    const [fullName, setFullName] = useState("");
    const toggleVisitModal = () => {
        visitRef.current.classList.toggle("hidden");
        visitRef.current.classList.toggle("flex");
    }

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('isLoggedIn')));
        if (token) {
            verifyToken(token, navigate, dispatch);
        }
    }, [token]);


    useEffect(() => {
        getSingleProperty();
    }, []);

    function getSingleProperty() {
        axios.post('/getsingleproperty', {id})
            .then((obj) => {
                setProperty(obj.data.property);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function handleAddToCart() {
        axios.post('/addtocart', {
            userid: userStore.user._id,
            propertyId: property._id,
            propertyImage: property.primary_img,
            propertyTitle: property.title,
            propertyPrice: property.price,
            propertyAddress: property.address,
            retailer: userStore.user.role === 'retailer'
        })
            .then((obj) => {
                setIsPresent(true);
                setFlag(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleRemoveFromCart() {
        axios.post('/removefromcart', {
            userid: userStore.user._id,
            propertyId: property._id,
            retailer: userStore.user.role === 'retailer'
        })
            .then((obj) => {
                dispatch(removeItemFromCart(property._id));
                setIsPresent(false);
                setFlag(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const [flag, setFlag] = useState(false);
    useEffect(() => {
        userStore.user?.wishlist?.map((item) => {
            if (item.propertyId === property._id) {
                setFlag(true);
            }
        })
        if(flag) {
            setIsPresent(true);
        } else {
            setIsPresent(false);
        }
    });

    const [isPresent, setIsPresent] = useState(false);

    return (<>
            {/* Write the html code here */}
            <CommonNavbar/>

            <section className="bg-gray-900">
                {property ? (<>
                    <div className="grid grid-cols-5 py-8 gap-8 mx-8">
                        <div className="rounded col-span-3">
                            {Object.keys(property).length !== 0 &&
                                (
                                    <>
                                        <SinglePageCarousel images={property.secondary_img} />
                                    </>
                                )
                            }
                        </div>
                        <div className="rounded-2xl col-span-2 p-4">
                            {/*<img src={property.primary_img} alt="Property_Image" className="h-32 w-32"/>*/}
                            <div>
                                <h1 className="text-5xl text-white mb-4 font-semibold inline">{property.title}</h1>
                                {isPresent ? (
                                    <>
                                        <AiFillHeart className={"text-red-500 cursor-pointer mb-4 inline h-8 w-12"}
                                                     onClick={handleRemoveFromCart}/>
                                    </>
                                ) : (
                                    <>
                                        <AiOutlineHeart className={"text-red-500 cursor-pointer mb-4 inline h-8 w-12"}
                                                        onClick={handleAddToCart}/>
                                    </>
                                )}
                            </div>
                            <h2 className="text-3xl text-white mb-2 font-semibold">{property.description}</h2>
                            <div className="mb-2">
                                <h3 className="font-semibold text-white text-2xl mb-2 inline">Address: </h3>
                                <p className="font-semibold text-white text-2xl mb-2 inline">{property.address}</p>
                            </div>

                            <div className="mb-2">
                                <h3 className="font-semibold text-white mb-2 text-2xl inline">Rs. </h3>
                                <p className="font-semibold text-white text-2xl inline mb-2">{property.price}</p>
                            </div>

                            <div className="mb-2">
                                <h3 className="font-semibold text-white mb-2 text-2xl inline">Area: </h3>
                                <p className="font-semibold text-white text-2xl inline mb-2">{property.area} sq. feet</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="">
                                    <button className="text-white rounded-full w-full text-xl text-center px-4 py-4 hover:bg-pink-600 border-2 border-pink-600" onClick={toggleVisitModal}>Schedule Visit</button>
                                </div>
                                <div className="">
                                    <button className="text-white rounded-full w-full text-xl text-center px-4 py-4 hover:bg-pink-700 border-pink-600 bg-pink-600">Pay Token Money</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </>) : null}

                <div className="bg-black bg-opacity-50 absolute inset-0 justify-center items-center px-6 py-3 text-white rounded shadow hidden" ref={visitRef}>
                    <div className="bg-gray-200 py-2 px-3 rounded shadow-xl text-black w-[50%]">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-4xl font-bold tracking-wide">
                                Book Your Appointment
                            </h4>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full" onClick={toggleVisitModal}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </div>

                        <div className="mt-2">

                            <form>

                                <div className="grid md:grid-cols-1 md:gap-6">

                                    <div className="relative z-0 w-full mb-3 group">
                                        <input type="text" name="floating_first_name" id="floating_first_name"
                                               className="block py-2.5 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                                               placeholder="" required value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                                        <label htmlFor="floating_first_name"
                                               className="peer-focus:font-medium absolute text-md text-black placeholder:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Full Name
                                        </label>
                                    </div>

                                    <div className="relative w-full mb-3 group text-black z-10">
                                        <label >
                                            Appointment Date
                                        </label>
                                        <Datepicker
                                            showIcon
                                            className={"rounded-md"}
                                            placeholderText={"Select Date"}
                                            selected={dateObj}
                                            dateFormat="dd/MM/yyyy"
                                            onChange={(e) => setAppointmentDate(e)}
                                            minDate={new Date()}
                                            maxDate={lastWeek}
                                            showDisabledMonthNavigation
                                        />
                                    </div>

                                    <div className="relative z-0 w-full mb-3 group text-black">
                                        <label>
                                            Time Slot
                                        </label>
                                        <select
                                            name="propertytype"
                                            id="propertytype"
                                            autoComplete="address-level2"
                                            className="z-0 block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-lg ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={timeSlot}
                                            onChange={(e) => setTimeSlot(e.target.value)}
                                        >
                                            <option className="mx-1 border-2">10:00 - 11:00</option>
                                            <option className="mx-1 border-2">11:00 - 12:00</option>
                                            <option className="mx-1 border-2">13:00 - 14:00</option>
                                            <option className="mx-1 border-2">14:00 - 15:00</option>
                                            <option className="mx-1 border-2">15:00 - 16:00</option>
                                            <option className="mx-1 border-2">16:00 - 17:00</option>
                                            <option className="mx-1 border-2">17:00 - 18:00</option>
                                        </select>
                                    </div>


                                    {/*<div className="relative z-0 w-full mb-6 group">*/}
                                    {/*    <input type="tel" value={phone} name="floating_first_name" id="floating_first_name"*/}
                                    {/*           className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"*/}
                                    {/*           placeholder=" " required onChange={(e) => {*/}
                                    {/*        setPhone(e.target.value);*/}
                                    {/*    }}/>*/}
                                    {/*    <label htmlFor="floating_first_name"*/}
                                    {/*           className="peer-focus:font-medium absolute text-md text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">*/}
                                    {/*        Primary Mobile No.*/}
                                    {/*    </label>*/}
                                    {/*</div>*/}

                                    {/*<div className="relative z-0 w-full mb-6 group">*/}
                                    {/*    <input type="tel" value={altPhone} name="floating_first_name" id="floating_first_name"*/}
                                    {/*           className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"*/}
                                    {/*           placeholder=" " required onChange={(e) => {*/}
                                    {/*        setAltPhone(e.target.value);*/}
                                    {/*    }}/>*/}
                                    {/*    <label htmlFor="floating_first_name"*/}
                                    {/*           className="peer-focus:font-medium absolute text-md text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">*/}
                                    {/*        Alternate Mobile No.*/}
                                    {/*    </label>*/}
                                    {/*</div>*/}

                                    {/*<div className="relative z-0 w-full mb-6 group">*/}
                                    {/*    <input type="date" value={altPhone} name="floating_first_name" id="floating_first_name"*/}
                                    {/*           className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"*/}
                                    {/*           placeholder=" " required onChange={(e) => {*/}
                                    {/*        setAltPhone(e.target.value);*/}
                                    {/*    }}/>*/}
                                    {/*    <label htmlFor="floating_first_name"*/}
                                    {/*           className="peer-focus:font-medium absolute text-md text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">*/}
                                    {/*        Date*/}
                                    {/*    </label>*/}
                                    {/*</div>*/}

                                    {/*<div className="relative z-0 w-full mb-6 group">*/}
                                    {/*    <input type="time" value={altPhone} name="floating_first_name" id="floating_first_name"*/}
                                    {/*           className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"*/}
                                    {/*           placeholder=" " required onChange={(e) => {*/}
                                    {/*        setAltPhone(e.target.value);*/}
                                    {/*    }}/>*/}
                                    {/*    <label htmlFor="floating_first_name"*/}
                                    {/*           className="peer-focus:font-medium absolute text-md text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">*/}
                                    {/*        Date*/}
                                    {/*    </label>*/}
                                    </div>
                            </form>

                        </div>

                        <div className={"mt-3 flex justify-end space-x-3"}>
                            <button className="px-3 py-1 text-black rounded hover:bg-red-600 hover:bg-opacity-50 hover:text-red-100" onClick={toggleVisitModal}>Cancel</button>
                            <button className="px-3 py-1 bg-red-800 text-gray-200 rounded hover:bg-red-600" onClick={bookAppointment}>Book</button>
                        </div>
                        {/*<button className="p-1 mt-2 bg-blue-600 text-white px-3 py-2 rounded" onClick={handleProfileUpdate}>*/}
                        {/*    Update*/}
                        {/*</button>*/}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
};

export default SinglePropertyPage;
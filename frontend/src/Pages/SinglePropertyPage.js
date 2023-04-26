import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import CommonNavbar from "../Components/CommonNavbar";
import Footer from "../Components/Footer";
import verifyToken from "../utils/verifyToken";
import SinglePageCarousel from "../Components/SinglePageCarousel";
import {AiOutlineHeart, AiFillHeart, AiFillCheckCircle, AiFillCloseCircle} from 'react-icons/ai';
import {removeItemFromCart} from "../utils/userSlice";
import Datepicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {toast} from "react-toastify";


const SinglePropertyPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [token, setToken] = useState();

    const userStore = useSelector(store => store.user);

    const [property, setProperty] = useState({});

    const visitRef = useRef();
    const paymentModal = useRef();

    const [dateObj, setDateObj] = useState();
    const [date, setDate] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [timeSlot, setTimeSlot] = useState("");


    function bookAppointment() {
        axios.post(`/bookappointment/${userStore.user.email}`, {date, month, year, timeSlot, fullName})
            .then((obj) => {
                if(obj.data.message) {
                    toast.success("Appointment booked successfully");
                } else {
                    toast.error("Appointment not booked, Please try again !!");
                }
            })
            .catch((error) => {
                console.log(error);
            })
        toggleVisitModal();
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

    const togglePaymentModal = () => {
        paymentModal.current.classList.toggle("hidden");
        paymentModal.current.classList.toggle("flex");
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

    function openRazorPayDialog(data) {
        const options = {
            key: "rzp_test_eoOxntDezEipHg",
            amount: data.amount,
            currency: data.currency,
            name: "Estately",
            order_id: data.id,
            description: "Confirm your appointment",
            handler: function(response) {
                console.log(response);
                axios.post('/verify', {response: response})
                    .then((obj) => {
                        console.log(obj);
                        if(obj.data.signatureIsValid) {
                            toast.success("Payment Successful");
                            bookAppointment();
                        } else {
                            toast.error("Some error occurred");
                        }

                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            theme: {
                color: "#3399cc"
            }
        };

        const razorPay = new window.Razorpay(options);
        razorPay.open();
    }

    const handleAppointmentPayment = () => {
        axios.get('/appointmentorders')
            .then((obj) => {
                if(obj.data.order) {
                    openRazorPayDialog(obj.data.order);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    const [amount, setAmount] = useState(0);
    
    const handleTokenMoneyPayment = () => {
        togglePaymentModal();
        axios.post('/tokenorders', {
            amount: (3/100)*property.price
        })
            .then((obj) => {
                if(obj.data.order) {
                    openRazorPayDialog(obj.data.order);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // amenities array -> lift security playground gardens water-supply power-backup parking-area gym shopping-mall hospital schools market-area
    const [amenityArr, setAmenityArr] = useState(["Lift", "Security", "Playground", "Garden", "Water Supply", "Power Backup", "Parking Area", "Gym", "Shopping Mall", "Hospital", "Schools", "Market Area"]);

    useEffect(() => {
        console.log(property);
    }, [property]);

    return (<>
            {/* Write the html code here */}
            <CommonNavbar/>

            <section className="bg-gray-900">
                {property ? (<>
                    <div className="grid grid-cols-5 py-8 gap-8 mx-8">

                        <div className="rounded-2xl col-span-2 p-4">
                            {/*<img src={property.primary_img} alt="Property_Image" className="h-32 w-32"/>*/}
                            <div className="mb-6">
                                <h1 className="text-5xl text-white tracking-wide mb-4 font-semibold inline">{property.title}</h1>
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

                            <div className="mb-4">
                                <h2 className="text-3xl font-medium text-white">Description</h2>
                                <hr className="h-[1px] bg-gray-200 mt-2 mb-1 border-0 dark:bg-gray-700"/>
                                <p className="text-lg text-white mb-2 font-medium">{property.description}</p>
                            </div>

                            <div className="mb-4">
                                <h2 className="text-3xl font-medium text-white">Address</h2>
                                <hr className="h-[1px] bg-gray-200 mt-2 mb-1 border-0 dark:bg-gray-700"/>
                                <p className="text-lg text-white mb-2 font-medium">{property.address}</p>
                            </div>

                            <div className="mb-4">
                                <h2 className="text-3xl font-medium text-white">Price</h2>
                                <hr className="h-[1px] bg-gray-200 mt-2 mb-1 border-0 dark:bg-gray-700"/>
                                <p className="text-lg text-white mb-2 font-medium">Rs. {property.price}</p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-3xl font-medium text-white">Area</h2>
                                <hr className="h-[1px] bg-gray-200 mt-2 mb-1 border-0 dark:bg-gray-700"/>
                                <p className="text-lg text-white mb-2 font-medium">{property.area} sq. feet</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="">
                                    <button className="text-white rounded-full w-full text-xl text-center px-4 py-4 hover:bg-pink-600 border-2 border-pink-600" onClick={toggleVisitModal}>Schedule Visit</button>
                                </div>
                                <div className="">
                                    <button className="text-white rounded-full w-full text-xl text-center px-4 py-4 hover:bg-pink-700 border-pink-600 bg-pink-600" onClick={togglePaymentModal}>Pay Token Money</button>
                                </div>
                            </div>
                        </div>

                        <div className="rounded col-span-3">
                            {Object.keys(property).length !== 0 &&
                                (
                                    <>
                                        <SinglePageCarousel images={property.secondary_img} />
                                    </>
                                )
                            }
                        </div>

                    </div>

                    <div className="mx-8">
                        <div className="p-4">
                            <h2 className="text-3xl font-medium ml-1 tracking-wide text-white">Amenities</h2>
                            <hr className="h-[1px] bg-gray-200 mt-2 mb-1 border-0 dark:bg-gray-700"/>
                        </div>
                        <div className="grid grid-cols-4 mx-6 pb-10">
                            {property.amenities &&  property.amenities.map((value, index) => {
                                if(value) {
                                    return (
                                        <>
                                            <div className="p-2 place-items-center">
                                                <AiFillCheckCircle className={"text-green-500 mr-2 inline"}/>
                                                <span className={"text-white inline text-lg"}>{amenityArr[index]}</span>
                                            </div>
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <div className="p-2 place-items-center">
                                                <AiFillCloseCircle className={"text-red-500 mr-2 inline"}/>
                                                <span className={"text-white inline text-lg"}>{amenityArr[index]}</span>
                                            </div>
                                        </>
                                    )
                                }
                            })}
                        </div>
                    </div>

                </>) : null}

                <div className="bg-black bg-opacity-50 fixed inset-0 justify-center items-center px-6 py-3 text-white rounded shadow hidden" ref={visitRef}>
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
                                </div>
                            </form>

                        </div>

                        <div className={"mt-3 flex justify-end space-x-3"}>
                            <button className="px-3 py-1 text-black rounded hover:bg-red-600 hover:bg-opacity-50 hover:text-red-100" onClick={toggleVisitModal}>Cancel</button>
                            <button className="px-3 py-1 bg-red-800 text-gray-200 rounded hover:bg-red-600" onClick={() => {
                                toggleVisitModal();
                                handleAppointmentPayment();
                            }}>Schedule Appointment</button>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <div className="bg-black bg-opacity-50 fixed inset-0 justify-center items-center px-6 py-3 text-white rounded shadow hidden" ref={paymentModal}>
                    <div className="bg-gray-200 py-2 px-3 rounded shadow-xl text-black w-[50%]">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-4xl font-bold tracking-wide">
                                Confirm...
                            </h4>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full" onClick={togglePaymentModal}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </div>

                        <div className="mt-2">

                            <h4>Have you visited the site yet?</h4>
                            <h4>If not, we recommend you to first book an appointment and visit the site and then submit the token money.</h4>
                        </div>

                        <div className={"mt-3 flex justify-end space-x-3"}>
                            {/*<button className="px-3 py-1 text-black rounded hover:bg-red-600 hover:bg-opacity-50 hover:text-red-100" onClick={togglePaymentModal}>No</button>*/}
                            <button className="px-3 py-1 bg-red-800 text-gray-200 rounded hover:bg-red-600" onClick={() => {
                                handleAppointmentPayment();
                                togglePaymentModal();
                            }}>Schedule Visit</button>
                            <button className="px-3 py-1 bg-red-800 text-gray-200 rounded hover:bg-red-600" onClick={handleTokenMoneyPayment}>Pay token money</button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
};

export default SinglePropertyPage;
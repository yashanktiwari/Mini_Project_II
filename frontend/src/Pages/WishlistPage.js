import CommonNavbar from "../Components/CommonNavbar";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {removeItemFromCart, setUser} from "../utils/userSlice";
import {Link, useNavigate} from "react-router-dom";
import {MdRemoveCircle} from "react-icons/md";
import verifyToken from "../utils/verifyToken";
import Footer from "../Components/Footer";

const WishlistPage = () => {

        const [token, setToken] = useState();

        const navigate = useNavigate();
        const dispatch = useDispatch();

        const userStore = useSelector(store => store.user);

        useEffect(() => {
            setToken(JSON.parse(localStorage.getItem('isLoggedIn')));
            if (token) {
                verifyToken(token, navigate, dispatch);
                // axios.post('/extractToken', {token})
                //     .then((obj) => {
                //         dispatch(setUser(obj.data));
                //     })
                //     .catch((error) => {
                //         return {
                //             errorMsg: error
                //         }
                //     });
            }
        }, [token]);

        function handleRemoveFromCart(propertyId) {
            axios.post('/removefromcart', {
                userid: userStore.user._id,
                propertyId: propertyId,
                retailer: userStore.user.role === 'retailer'
            })
                .then((obj) => {
                    dispatch(removeItemFromCart(propertyId));
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        return (
            <div className={"bg-gray-900"}>
                {/* Write the html code here */}
                <CommonNavbar/>

                {userStore.user.wishlist && userStore.user.wishlist.length == 0 ? (
                    <>
                        <div className={"flex items-center justify-center min-h-[560px]"}>
                            <div className={"h-fit w-fit px-16 py-6 rounded-xl flex flex-col items-center justify-center sm-w-fit md:mx-4 sm:mx-4"}
                            >
                                <h1 className={"font-semibold text-[#F5FEFD] text-4xl"}>Your wishlist is currently empty</h1>
                                <h1 className={"text-xl mt-2 text-[#F5FEFD]"}>
                                    Check out the <Link to={'/dashboard'}                                           className={"cursor-pointer text-blue-500"}>Latest Properties</Link> that are listed
                                </h1>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={"py-8 px-12 min-h-[80vh] bg-gray-900"}>
                        <h1 className={"font-semibold text-3xl text-[#F5FEFD]"}>My Wishlist
                            ({userStore.user?.wishlist?.length} {userStore.user?.wishlist?.length == 1 ? (
                                <>
                                    <span>Property</span>
                                </>
                            ) : (
                                <>
                                    <span>Properties</span>
                                </>
                            )})
                        </h1>

                        <div className={"h-fit px-4 py-5 rounded-xl min-h-[768px]"}>
                            {userStore.user.wishlist && userStore.user?.wishlist.map((property) => {
                                return (

                                <div className="rounded-[7px] my-5" key={property.propertyId}>
                                    <div className="flex flex-col items-center border text-white rounded-lg shadow md:flex-row border-gray-700 bg-gray-800 hover:bg-gray-700 overflow-hidden">
                                        <div className="overflow-hidden w-full md:w-[17rem]">
                                        <img
                                            className="hover:scale-110 transition-all duration-500 object-cover w-full rounded-t-lg h-[12rem] sm:w-full lg:w-[17rem] md:rounded-none md:rounded-l-lg overflow-hidden"
                                            src={property.propertyImage} alt="Property_Image" />
                                        </div>
                                        <div className="flex flex-col justify-around p-4 leading-normal ">
                                            <div>
                                            <Link to={`/properties/${property.propertyId}`}>
                                                <h5 className="mb-4 text-3xl font-bold tracking-wide text-white">{property.propertyTitle}</h5>
                                            </Link>
                                            </div>

                                            <div className="mb-2">
                                                <p className="text-xl inline font-semibold tracking-tight text-white">Address : </p>
                                                <p className="inline text-white tracking-wide">{property.propertyAddress}</p>
                                            </div>

                                            <div className="mb-2">
                                                <p className="text-xl inline font-semibold tracking-tight text-white">Area : </p>
                                                <p className="inline text-white tracking-wide">{property.area} sq. ft.</p>
                                            </div>

                                            <div className="mb-2">
                                                <p className="text-lg inline font-semibold tracking-tight text-white">Price : </p>
                                                <p className="inline text-white tracking-wide">Rs. {property.propertyPrice}</p>
                                            </div>
                                        </div>

                                        <button className="ml-auto mt-auto cursor-pointer z-10 text-[#F5FEFD] hover:bg-red-500 bg-red-700 rounded-xl p-2 m-4"
                                            onClick={(e) => handleRemoveFromCart(property.propertyId)}>
                                            Remove
                                        </button>
                                        {/*<h5><span className={"text-[#F5FEFD] bg-red-700 p-2 rounded-xl h-7 w-7 cursor-pointer"}*/}
                                        {/*          onClick={(e) => handleRemoveFromCart(property.propertyId)}>Remove</span>*/}
                                        {/*</h5>*/}
                                    </div>
                                </div>


                                )
                            })}
                        </div>
                    </div>
                )}
                <Footer />
            </div>
        )
    }
;

export default WishlistPage;
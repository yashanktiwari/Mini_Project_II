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
            <div className={"bg-gray-900 h-[115vh]"}>
                {/* Write the html code here */}
                <CommonNavbar/>

                {userStore.user.wishlist && userStore.user.wishlist.length == 0 ? (
                    <>
                        <div className={"min-h-[80vh] flex justify-center items-center"}>
                        <div
                            className={"h-fit border border-gray-300  w-fit px-16 py-6 rounded-xl flex flex-col items-center justify-center sm-w-fit md:mx-4 sm:mx-4"}>
                            <h1 className={"font-semibold text-[#F5FEFD] text-4xl"}>Your wishlist is currently empty</h1>
                            <h1 className={"text-xl mt-2 text-[#F5FEFD]"}>Check out the <Link to={'/dashboard'}
                                                                                              className={"cursor-pointer text-blue-500"}>Latest
                                Properties</Link> that are listed</h1>
                        </div>
                        </div>
                    </>
                ) : (
                    <div className={"py-8 px-12 min-h-[80vh]"}>
                        <h1 className={"font-semibold text-3xl text-[#F5FEFD]"}>My Wishlist
                            ({userStore.user?.wishlist?.length} {userStore.user?.wishlist?.length == 1 ? (
                                <>
                                    <span>Property</span>
                                </>
                            ) : (
                                <>
                                    <span>Properties</span>
                                </>
                            )})</h1>
                        <div className={"overflow-hidden overflow-y-scroll h-fit max-h-[75vh] border border-gray-300 px-4 py-5 mt-4 rounded-xl"}>
                            {userStore.user.wishlist && userStore.user?.wishlist.map((property) => {
                                return (
                                    <div key={property.propertyId}>
                                        <div className={"flex mb-4"}>
                                            <div
                                                className="flex flex-col rounded-xl shadow md:flex-row w-full bg-gray-800">
                                                <img
                                                    className="px-4 py-2 w-72 object-cover w-full rounded-t-lg min-[500px]:h-40 min-[500px]:w-full md:h-64lg:h-52 lg:w-64 md:h-auto md:rounded-none md:rounded-l-lg"
                                                    src={property.propertyImage} alt=""/>
                                                <div className="flex flex-col justify-between p-4 w-full">

                                                    <Link to={`/properties/${property.propertyId}`}
                                                          className="mb-2 text-2xl font-bold tracking-tight text-white">{property.propertyTitle}</Link>


                                                    <p className="mb-3 font-normal text-gray-400">Address: {property.propertyAddress}</p>
                                                    <div className={"flex justify-between w-[100%]"}>
                                                        <p className="mb-3 font-normal text-gray-400">Price: {property.propertyPrice}</p>
                                                        <h5><span className={"text-[#F5FEFD] bg-red-700 p-2 rounded-xl h-7 w-7 cursor-pointer"}
                                                                            onClick={(e) => handleRemoveFromCart(property.propertyId)}>Remove this property</span>
                                                        </h5>
                                                    </div>

                                                </div>

                                            </div>
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
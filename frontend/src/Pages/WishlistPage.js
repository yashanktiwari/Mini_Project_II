import CommonNavbar from "../Components/CommonNavbar";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {removeItemFromCart, setUser} from "../utils/userSlice";
import {Link} from "react-router-dom";
import {MdRemoveCircle} from "react-icons/md";

const WishlistPage = () => {

    const {id} = useParams();

    const [token, setToken] = useState();

    const dispatch = useDispatch();

    const userStore = useSelector(store => store.user);

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('isLoggedIn')));
        if (token) {
            axios.post('/extractToken', {token})
                .then((obj) => {
                    dispatch(setUser(obj.data));
                })
                .catch((error) => {
                    return {
                        errorMsg: error
                    }
                });
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
        <>
            {/* Write the html code here */}
            <CommonNavbar/>
            <h1>Wishlist</h1>

            {userStore.user.wishlist && userStore.user?.wishlist.map((property) => {
                return (
                    <div key={property.propertyId}>
                        <div className={"flex"}>
                        <Link to={`/properties/${property.propertyId}`}
                              className="flex flex-col items-center border rounded-lg shadow md:flex-row w-96 border-gray-700 bg-gray-800 hover:bg-gray-700">
                            <img
                                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                src={property.propertyImage} alt=""/>
                            <div className="flex flex-col justify-between p-4 leading-normal">

                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{property.propertyTitle}</h5>


                                <p className="mb-3 font-normal text-gray-400">Address: {property.propertyAddress}</p>
                                <p className="mb-3 font-normal text-gray-400">Price: {property.propertyPrice}</p>
                            </div>
                        </Link>
                        <h5><MdRemoveCircle className={"text-red-500 h-7 w-7 cursor-pointer"} onClick={(e) => handleRemoveFromCart(property.propertyId)}/></h5>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
    ;

    export default WishlistPage;
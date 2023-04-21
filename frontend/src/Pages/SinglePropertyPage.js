import {useParams} from "react-router";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import CommonNavbar from "../Components/CommonNavbar";
import Footer from "../Components/Footer";
import verifyToken from "../utils/verifyToken";
import SinglePageCarousel from "../Components/SinglePageCarousel";
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {removeItemFromCart} from "../utils/userSlice";

const SinglePropertyPage = () => {

    const {id} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [token, setToken] = useState();

    const userStore = useSelector(store => store.user);

    const [property, setProperty] = useState({});

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

            {property ? (<>
                <div className="flex">
                    <div>
                        {Object.keys(property).length !== 0 &&
                            (
                                <>
                                    <SinglePageCarousel images={property.secondary_img}/>
                                </>
                            )
                        }
                    </div>
                    <div className="flex flex-col">
                        <img src={property.primary_img} alt="Property_Image" className="h-32 w-32"/>
                        <h1>{property.title}</h1>
                        <h2>{property.description}</h2>
                        <h3>Address: {property.address}</h3>
                        <h3>Price: {property.price}</h3>


                        {isPresent ? (
                            <>
                                <h3>Area: {property.area}</h3>
                                <AiFillHeart className={"text-red-500 cursor-pointer h-8 w-8"}
                                             onClick={handleRemoveFromCart}/>
                            </>
                        ) : (
                            <>
                                <h3>Area: {property.area}</h3>
                                <AiOutlineHeart className={"text-red-500 cursor-pointer h-8 w-8"}
                                                onClick={handleAddToCart}/>
                            </>
                        )}


                    </div>
                </div>
            </>) : null}
            <Footer/>
        </>
    )
};

export default SinglePropertyPage;
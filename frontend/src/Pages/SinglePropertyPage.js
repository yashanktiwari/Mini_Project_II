import {useParams} from "react-router";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import CommonNavbar from "../Components/CommonNavbar";
import Footer from "../Components/Footer";
import verifyToken from "../utils/verifyToken";
import SinglePageCarousel from "../Components/SinglePageCarousel";

const SinglePropertyPage = () => {

    const {id} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [token, setToken] = useState();

    const [property, setProperty] = useState({});

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('isLoggedIn')));
        if(token) {
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


    return (<>
        {/* Write the html code here */}
        <CommonNavbar/>



        {property ? (<>
            <div className="flex">
                <div>
            { Object.keys(property).length !== 0 &&
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
                <h3>Area: {property.area}</h3>
                </div>
            </div>
            </>) : null}
        <Footer/>
    </>
)
};

export default SinglePropertyPage;
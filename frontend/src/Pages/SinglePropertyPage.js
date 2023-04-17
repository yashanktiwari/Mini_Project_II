import {useParams} from "react-router";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import CommonNavbar from "../Components/CommonNavbar";
import Footer from "../Components/Footer";
import verifyToken from "../utils/verifyToken";

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
            console.log(token);
        }
    }, [token]);


    useEffect(() => {
        getSingleProperty();
    }, []);

    function getSingleProperty() {
        axios.post('/getsingleproperty', {id})
            .then((obj) => {
                // console.log(obj.data.property);
                setProperty(obj.data.property);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    // if(Object.keys(property).length !== 0) {
    //     for(let i=0; i<property.secondary_img.length; i++) {
    //         console.log(property.secondary_img[i]);
    //     }
    // }


    console.log(property);
    return (<>
        {/* Write the html code here */}
        <CommonNavbar/>

            {/*{Object.keys(property).length !== 0 ? (*/}
            {/*    <h1>Loaded</h1>*/}
            {/*    ) : (*/}
            {/*        <h1>Not loaded</h1>*/}
            {/*)}*/}

        {Object.keys(property).length !== 0 ? (<>

            <div id="default-carousel" className="relative w-full" data-carousel="slide">
                {/*Carousel Wrapper*/}
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {/*Items*/}
                    {property.secondary_img.map((img) => {
                        console.log(img);
                        return (
                            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src={img}
                                     className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                     alt="..." />
                            </div>
                        )
                    })}
                </div>
                {/*Slider Indicator*/}
                <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                    {
                        property.secondary_img.map((img, index) => {
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="true"
                                    aria-label={`Slide ${index+1}`} data-carousel-slide-to="0"></button>
                        })
                    }

                </div>

                {/*Slider Controls*/}

                <button type="button"
                        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-prev>
        <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none"
                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            <span className="sr-only">Previous</span>
        </span>
                </button>
                <button type="button"
                        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-next>
        <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none"
                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="sr-only">Next</span>
        </span>
                </button>
            </div>

        </>
            ) : null}

        {property ? (<>
                <img src={property.primary_img} alt="Property_Image" className="h-32 w-32"/>
                <h1>{property.title}</h1>
                <h2>{property.description}</h2>
                <h3>Address: {property.address}</h3>
                <h3>Price: {property.price}</h3>
                <h3>Area: {property.area}</h3>

            </>) : null}
        <Footer/>
    </>
)
};

export default SinglePropertyPage;
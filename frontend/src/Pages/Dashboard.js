import { useSelector,useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {useEffect, useState} from "react";
import CommonNavbar from "../Components/CommonNavbar";
import verifyToken from "../utils/verifyToken";
import axios from "axios";
// import FilterBox from "../Components/FilterBox";
import DashboardCarousel from "../Components/DashboardCarousel";

const Dashboard = () => {

    const [properties, setProperties] = useState([]);

    const navigate = useNavigate();
    if(localStorage.getItem("isLoggedIn") == null) {
        navigate("/");
    }

    const userStore = useSelector(store => store.user);
    const dispatch = useDispatch();

    const [token, setToken] = useState();

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('isLoggedIn')));

        if(token) {
            verifyToken(token, navigate, dispatch);
        }
    }, [token])

    useEffect(() => {
        getAllProperties();
    }, []);

    function getAllProperties() {
        axios.get('/getallproperties')
            .then((obj) => {
                setProperties(obj.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <CommonNavbar />
            {/*<h1>Dashboard</h1>*/}
            {/*<h1>User is logged in</h1>*/}
            {/*<h1>The email is: {userStore.user.email}</h1>*/}
            {/*<h1>The userid is: {userStore.user._id}</h1>*/}
            {/*<h1>The role is: {userStore.user.role}</h1>*/}

            {/*<FilterBox/>*/}

            <DashboardCarousel/>


            <div className="grid grid-cols-2 gap-12 mx-12 mt-6">

                {properties &&
                        properties.map((property) => {
                            return (
                                <div className="rounded-[7px] mb-4">
                                    <Link to={`/properties/${property._id}`}
                                       className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <img
                                            className="object-cover w-full rounded-t-lg h-[100%] md:h-[100%] md:w-2/5 md:rounded-none md:rounded-l-lg"
                                            src={property.primary_img} alt="Property_Image" />
                                            <div className="flex flex-col justify-between p-4 leading-normal">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{property.title}</h5>
                                                <span >
                                                    <p className="text-lg inline font-semibold tracking-tight text-white">Owner :</p>
                                                    <p className="inline text-white tracking-wide">{}</p>
                                                </span>
                                                <span>
                                                    <p className="text-lg inline font-semibold tracking-tight text-white">Address : </p>
                                                    <p className="inline text-white tracking-wide">{property.address}</p>
                                                </span>
                                                <span>
                                                    <p className="text-lg inline font-semibold tracking-tight text-white">Area : </p>
                                                    <p className="inline text-white tracking-wide">{property.area} sq. ft.</p>
                                                </span>
                                                <span>
                                                    <p className="text-lg inline font-semibold tracking-tight text-white">Price : </p>
                                                    <p className="inline text-white tracking-wide">Rs. {property.price}</p>
                                                </span>
                                            </div>
                                    </Link>
                                </div>
                            )
                        })
                    }

            </div>

            {/*<button onClick={handleLogout}>Logout</button>*/}
            {/*<Footer />*/}
        </>
    )
};

export default Dashboard;
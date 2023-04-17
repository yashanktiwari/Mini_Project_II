import { useSelector,useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {useEffect, useState} from "react";
import CommonNavbar from "../Components/CommonNavbar";
import verifyToken from "../utils/verifyToken";
import axios from "axios";

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
            <h1>Dashboard</h1>
            <h1>User is logged in</h1>
            <h1>The email is: {userStore.user.email}</h1>
            <h1>The userid is: {userStore.user._id}</h1>
            <h1>The role is: {userStore.user.role}</h1>

            <div className="flex">
            {properties &&
                properties.map((property) => {
                    return (

                        <Link to={`/properties/${property._id}`}
                           className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mx-2">
                            <img
                                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                src={property.primary_img} alt="Property_Image" />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{property.title}</h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{property.description}</p>
                                </div>
                        </Link>

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
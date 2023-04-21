import CommonNavbar from "../Components/CommonNavbar";
import Footer from "../Components/Footer";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import verifyToken from "../utils/verifyToken";
import axios from "axios";
import {toast} from "react-toastify";
import {countries} from "../utils/cityList";

const AddNewProperty = () => {

    countries[0].name = "India";
    const [country, setCountry] = useState("--Country--");
    const [state, setState] = useState("--State--");
    const [city, setCity] = useState("--City--");
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const changeCountry = (event) => {
        setCountry(event.target.value);
        setStates(countries.find((ctr) => ctr.name === event.target.value).states);
    };

    const changeState = (event) => {
        setState(event.target.value);
        setCities(states.find((state) => state.name === event.target.value).cities);
    };

    function changeCity(event) {
        setCity(event.target.value);
    }
    const [token, setToken] = useState();

    const dispatch = useDispatch();

    const userStore = useSelector(store => store.user);

    const navigate = useNavigate();
    useEffect(() => {
        if (userStore.user._id == null) {
            setToken(JSON.parse(localStorage.getItem('isLoggedIn')));
            if (token) {
                verifyToken(token, navigate, dispatch);
            }
        }
    }, [token]);

    const [showSelectedImages, setShowSelectedImages] = useState([]);
    // const [selectedImagesBase, setSelectedImagesBase] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [state, setState] = useState("");
    // const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [primaryImage, setPrimaryImage] = useState([]);
    const [secondaryImages, setSecondaryImages] = useState([]);

    const [compressedImages, setCompressedImages] = useState([]);

    const onSelectFiles = (e) => {
        const selectedFilesArray = Array.from(e.target.files);
        console.log(selectedFilesArray);


        const imagesArr = selectedFilesArray.map((image) => {
            return URL.createObjectURL(image);
        });

        selectedFilesArray.slice(0).forEach(image => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = () => {
                setSecondaryImages(oldArray => [...oldArray, reader.result]);
            }
        })

        const reader = new FileReader();
        reader.readAsDataURL(selectedFilesArray[0]);
        reader.onloadend = () => {
            setPrimaryImage(reader.result);
        }

        setShowSelectedImages(imagesArr);
    }

    const handleAddingPost = () => {
        if(showSelectedImages.length < 4) {
            toast.error("Please upload minimum 4 photos");
            return;
        }

        if(title.length===0 || description.length===0 || state.length===0 || city.length===0 || address.length===0 || price.length===0 || area.length===0 || propertyType.length===0) {
            toast.error("Filling all the fields is mandatory");
            return;
        }

        toast.success("Listing is in progress");
        axios.post('/addnewproperty', {
            primary_img: primaryImage,
            secondary_img: secondaryImages,
            title,
            description,
            state,
            city,
            address,
            price,
            area,
            propertyType,
            owner_id: userStore.user._id
        })
            .then((obj) => {
                if (obj.data.error) {
                    toast.error("Property not listed, Please try again!!!");
                } else {
                    toast.success("Property successfully listed");
                    navigate('/dashboard');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <>
            <CommonNavbar/>

            <section className={"bg-gray-900"}>
                <div className="w-[70%] mx-auto">
                    <h1 className={"font-bold text-4xl pt-4 text-white text-center"}>List a new property</h1>

                    <div className="mx-auto grid grid-rows-1">
                        <div className="border-b border-gray-900/10 pb-6 grid-cols-2">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="title"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="Title"
                                            autoComplete="title"
                                            className="inline w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {setTitle(e.target.value)}}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="description"
                                            name="description"
                                            type="text"
                                            placeholder="Description"
                                            autoComplete="description"
                                            className="inline w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {setDescription(e.target.value)}}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="area"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Area ( in sq. feet )
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="area"
                                            name="area"
                                            type="number"
                                            placeholder="Area"
                                            autoComplete="area"
                                            className="inline w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {setArea(e.target.value)}}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="country"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Country
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={country}
                                            onChange={changeCountry}
                                        >
                                            <option>--Country--</option>
                                            {countries.map((ctr) => (
                                                <option value={ctr.name}>{ctr.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="state"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        State
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            name="state"
                                            id="state"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={state}
                                            onChange={changeState}
                                        >
                                            <option>--State--</option>
                                            {states.map((state) => (
                                                <option value={state.name}>{state.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-2 ">
                                    <label
                                        htmlFor="city"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            name="city"
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={city}
                                            onChange={changeCity}
                                        >
                                            <option>--City--</option>
                                            {cities.map((city) => (
                                                <option value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="street-address"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Address
                                    </label>
                                    <div className="mt-2">
                                            <textarea
                                                name="street-address"
                                                id="street-address"
                                                autoComplete="street-address"
                                                placeholder=" Enter your Complete Address..."
                                                className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => {
                                                    setAddress(e.target.value);
                                                }}

                                            />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="price"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Price
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="price"
                                            name="price"
                                            type="number"
                                            placeholder="Price"
                                            autoComplete="price"
                                            className="inline w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {setPrice(e.target.value)}}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="propertytype"
                                        className="block text-sm leading-6 text-white font-semibold"
                                    >
                                        Property Type
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="propertytype"
                                            name="propertytype"
                                            type="text"
                                            placeholder="Property Type"
                                            autoComplete="propertytype"
                                            className="inline w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => {setPropertyType(e.target.value)}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"border border-gray-500 mt-4 h-fit rounded-xl"}>
                            <div className={"flex justify-center items-center p-1 border border-black m-5 rounded-xl bg-gray-700 text-white"}>

                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-plus mr-1 font-bold h-6 w-6" viewBox="0 0 16 16">
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <label className="cursor-pointer p-2"> Add Images
                                    <input type="file" multiple accept="image/png, image/jpeg" onChange={onSelectFiles}
                                           className="hidden"/>
                                </label>
                            </div>

                            <div className="flex justify-center items-center flex-wrap">
                                {showSelectedImages &&
                                    showSelectedImages.map((image, index) => {
                                        return (
                                            <>
                                                <div key={index} className="flex flex-col my-4">
                                                    <img src={image} className="h-40 w-48 rounded-xl mx-4 border border-gray my-2"/>
                                                    <button className="mx-4 bg-red-600 rounded-xl text-white h-8" onClick={() => {
                                                        setShowSelectedImages(showSelectedImages.filter((e) => e !== image));
                                                        console.log(showSelectedImages);
                                                    }}>Delete
                                                    </button>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>


                        <button className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-md px-5 py-2.5 text-center my-10" onClick={handleAddingPost}>List New Property</button>
                    </div>


                </div>
            </section>
            <Footer/>
        </>
    )
};

export default AddNewProperty;
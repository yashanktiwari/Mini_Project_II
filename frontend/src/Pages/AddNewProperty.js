import CommonNavbar from "../Components/CommonNavbar";
import Footer from "../Components/Footer";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import verifyToken from "../utils/verifyToken";
import axios from "axios";
import {toast} from "react-toastify";

const AddNewProperty = () => {

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
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [primaryImage, setPrimaryImage] = useState([]);
    const [secondaryImages, setSecondaryImages] = useState([]);


    const onSelectFiles = (e) => {
        // const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(e.target.files);

        const imagesArr = selectedFilesArray.map((image) => {
            return URL.createObjectURL(image);
        });

        selectedFilesArray.slice(1).forEach(image => {
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
            {/* Write the html code here */}
            <CommonNavbar/>
            <h1>Hello from add new property page</h1>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" className="border border-black block" onChange={(e) => {
                setTitle(e.target.value);
            }}/>

            <label htmlFor="description">Description</label>
            <textarea type="text" id="description" className="border border-black block resize-none" onChange={(e) => {
                setDescription(e.target.value);
            }}/>

            <label htmlFor="state">State</label>
            <input type="text" id="state" className="border border-black block" onChange={(e) => {
                setState(e.target.value);
            }}/>

            <label htmlFor="city">City</label>
            <input type="text" id="city" className="border border-black block" onChange={(e) => {
                setCity(e.target.value);
            }}/>

            <label htmlFor="address">Address</label>
            <textarea type="text" id="address" className="border border-black block resize-none" onChange={(e) => {
                setAddress(e.target.value);
            }}/>

            <label htmlFor="price">Price</label>
            <input type="number" id="price" className="border border-black block" onChange={(e) => {
                setPrice(e.target.value);
            }}/>

            <label htmlFor="area">Area (in sq. feet)</label>
            <input type="number" id="area" className="border border-black block" onChange={(e) => {
                setArea(e.target.value);
            }}/>

            <label htmlFor="property-type">Property Type</label>
            <input type="text" id="property-type" className="border border-black block" onChange={(e) => {
                setPropertyType(e.target.value);
            }}/>

            <div className="my-4">
                <label className="cursor-pointer border border-gray bg-gray-700 text-white p-2"> Add Images
                    <input type="file" multiple accept="image/png, image/jpeg" onChange={onSelectFiles}
                           className="hidden"/>
                </label>
                <div className="flex flex-wrap">
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

            <button className="bg-gray-700 my-4 p-2 text-white" onClick={handleAddingPost}>List New Property</button>
            <Footer/>
        </>
    )
};

export default AddNewProperty;
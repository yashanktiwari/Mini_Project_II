import {useEffect, useState} from "react";
import '../css/FilterBox.css';
import {countries} from "../utils/cityList";
import MultiRangeSlider from "./MultiRangeSlider";
import {toast} from "react-toastify";
import axios from "axios";

const FilterBox = ({cState, cCity, setFilters}) => {
    const [country, setCountry] = useState("India");
    const [state, setState] = useState(cState);
    const [city, setCity] = useState(cCity);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [minPrice, setMinPrice] = useState(1000000);
    const [maxPrice, setMaxPrice] = useState(70000000);
    const [propertyType, setPropertyType] = useState("Residential");
    const [searchKey, setSearchKey] = useState("");
    const [minArea, setMinArea] = useState(0);
    const [maxArea, setMaxArea] = useState(5000);

    const changePropertyType = (event) => {
        setPropertyType(event.target.value);
    }


    useEffect(() => {
        let arr = countries[0].states.filter((obj) => {
            return obj.name !== state;
        });
        setStates(arr);
        let cities;
        countries[0].states.map((obj) => {
            if(obj.name == state) {
                cities = obj.cities;
            }
        });

        let finalArr = cities.filter((city) => {
            return city != cCity;
        })
        setCities(finalArr);
    }, [state])

    const changeState = (event) => {
        setState(event.target.value);
        setCities(states.find((state) => state.name === event.target.value).cities);
        setCity("--City--");
    };

    function changeCity(event) {
        setCity(event.target.value);
    }

    const search = () => {
        if(city === "--City--") {
            toast.error("Please select a city");
            return;
        }

        getFilteredProperties();

    }

    function getFilteredProperties() {
        axios.post('/getfilteredproperties', {state, city, minPrice, maxPrice, propertyType, minArea, maxArea})
            .then((obj) => {
                if(obj.data.error) {
                    toast.error(obj.data.error);
                } else {
                    if(obj.data.properties.length == 0) {
                        toast.warn("Currently, there are no properties listed that best suits your choices");
                    } else {
                        setFilters(obj.data.properties);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            {/* Write the html code here */}
            <div className="bg-gray-100 w-fit mx-auto flex flex-row items-center border-4 p-1 mb-4 rounded-md">

                <div className="m-2">
                    <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={"India"}
                    >
                        <option>India</option>
                    </select>
                </div>

                <div className="m-2">
                    <select
                        name="state"
                        id="state"
                        autoComplete="address-level1"
                        className="block rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={state}
                        onChange={(e) => {
                            changeState(e);
                        }}
                    >
                        <option>{state}</option>
                        {states.map((state) => (
                            <option value={state.name}>{state.name}</option>
                        ))}
                    </select>
                </div>
                <div className="m-2">
                    <select
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={city}
                        onChange={changeCity}
                    >
                        <option>{city}</option>
                        {cities.map((city) => (
                            <option value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                <div className="m-2">
                    <MultiRangeSlider min={1000000} max={70000000} onChange={()=>{}} dispKey={"Price"} setMinimumValue = {setMinPrice} setMaximumValue = {setMaxPrice}
                     />
                </div>


                <div className="m-2">
                    <MultiRangeSlider min={0} onChange={()=>{}} max={100000} dispKey={"Area"} setMinimumValue={setMinArea} setMaximumValue={setMaxArea}/>
                </div>

                <div className="m-2">
                    <select
                        name="propertytype"
                        id="propertytype"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={propertyType}
                        onChange={changePropertyType}
                    >
                        <option className="mx-1 border-2">Residential</option>
                        <option className="mx-1 border-2">Commercial</option>
                        <option className="mx-1 border-2">Industrial</option>
                        <option className="mx-1 border-2">Agricultural</option>
                    </select>
                </div>

                <button
                    className="input-group-text flex items-center whitespace-nowrap rounded-md px-3 py-1.5 text-center text-base font-normal border-2 bg-transparent hover:border-gray-900 m-2"
                    id="basic-addon2" onClick={search}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 bg-transparent">
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd"/>
                    </svg>
                </button>

                <div className="m-2">
                    <label className={'bg-blue-300 cursor-pointer hover:bg-blue-400 p-2 rounded-md'} onClick={(e) => {
                        setFilters([]);
                    }}>
                        Show Recent Properties
                    </label>
                </div>
            </div>
        </>
    )
};

export default FilterBox;
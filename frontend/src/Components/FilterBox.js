import {useState} from "react";
import '../css/FilterBox.css';
import {countries} from "../utils/cityList";
import MultiRangeSlider from "./MultiRangeSlider";


const FilterBox = () => {
    countries[0].name = "India";
    const [country, setCountry] = useState("--Country--");
    const [state, setState] = useState("--State--");
    const [city, setCity] = useState("--City--");
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [minPrice, setMinPrice] = useState(1000000);
    const [maxPrice, setMaxPrice] = useState(70000000);
    const [propertyType, setPropertyType] = useState();
    const [searchKey, setSearchKey] = useState("");
    const [minArea, setMinArea] = useState(0);
    const [maxArea, setMaxArea] = useState(5000);

    const changePropertyType = (event) => {
        setPropertyType(event.target.value);
    }

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

    const search = () => {
        console.log("Country: " + country + ", State: " + state + ", City: " + city + ", Property Type: " + propertyType + ", Search Key: " + searchKey + ", Min Price : " + minPrice + ", Max Price : " + maxPrice + ", Min Area: " + minArea + ", Max Area: " + maxArea);
    }

    return (
        <>
            {/* Write the html code here */}
            <div className="bg-grey-lighter w-fit mx-auto flex flex-row items-center border-4 p-1 rounded-md">

                {/*<label*/}
                {/*    htmlFor="country"*/}
                {/*    className="block text-sm leading-6 text-white font-semi-bold"*/}
                {/*>*/}
                {/*    Country*/}
                {/*</label>*/}
                <div className="m-2">
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

                {/*<label*/}
                {/*    htmlFor="state"*/}
                {/*    className="block text-sm leading-6 text-white font-semi-bold"*/}
                {/*>*/}
                {/*    State*/}
                {/*</label>*/}
                <div className="m-2">
                    <select
                        name="state"
                        id="state"
                        autoComplete="address-level1"
                        className="block rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={state}
                        onChange={changeState}
                    >
                        <option>--State--</option>
                        {states.map((state) => (
                            <option value={state.name}>{state.name}</option>
                        ))}
                    </select>
                </div>

                {/*<label*/}
                {/*    htmlFor="city"*/}
                {/*    className="block text-sm leading-6 text-white font-semi-bold"*/}
                {/*>*/}
                {/*    City*/}
                {/*</label>*/}
                <div className="m-2">
                    <select
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={city}
                        onChange={changeCity}
                    >
                        <option>--City--</option>
                        {cities.map((city) => (
                            <option value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                {/*<label*/}
                {/*    htmlFor="price"*/}
                {/*    className="block text-sm leading-6 text-white font-semi-bold"*/}
                {/*>*/}
                {/*    Price*/}
                {/*</label>*/}

                <div className="m-2">
                    {/*<select*/}
                    {/*    name="price"*/}
                    {/*    id="price"*/}
                    {/*    autoComplete="price"*/}
                    {/*    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                    {/*    value={price}*/}
                    {/*    onChange={changePrice}*/}
                    {/*>*/}
                    {/*    <option>--Price--</option>*/}
                    {/*    <option>10 Lakhs</option>*/}
                    {/*    <option>50 Lakhs</option>*/}
                    {/*    <option>1 Crore</option>*/}
                    {/*</select>*/}
                    <MultiRangeSlider min={1000000} max={70000000} onChange={()=>{}} dispKey={"Price"} setMinimumValue = {setMinPrice} setMaximumValue = {setMaxPrice}
                     />
                </div>


                {/*<label*/}
                {/*    htmlFor="area"*/}
                {/*    className="block text-sm leading-6 text-white font-semi-bold"*/}
                {/*>*/}
                {/*    Area*/}
                {/*</label>*/}
                <div className="m-2">
                    {/*<select*/}
                    {/*    name="area"*/}
                    {/*    id="area"*/}
                    {/*    autoComplete="address-level2"*/}
                    {/*    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                    {/*    value={area}*/}
                    {/*    onChange={changeArea}*/}
                    {/*>*/}
                    {/*    <option className="mx-1 border-2">--Area--</option>*/}
                    {/*    <option className="mx-1 border-2">100-200 sq.ft</option>*/}
                    {/*    <option className="mx-1 border-2">200-400 sq.ft</option>*/}
                    {/*    <option className="mx-1 border-2">400-600 sq.ft</option>*/}
                    {/*    <option className="mx-1 border-2">600-1K sq.ft</option>*/}
                    {/*    <option className="mx-1 border-2">Above 1K sq.ft</option>*/}
                    {/*</select>*/}
                    <MultiRangeSlider min={0} onChange={()=>{}} max={4000} dispKey={"Area"} setMinimumValue={setMinArea} setMaximumValue={setMaxArea}/>
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
                        <option className="mx-1 border-2">--Property Type--</option>
                        <option className="mx-1 border-2">Flat / Apartment</option>
                        <option className="mx-1 border-2">Shop</option>
                        <option className="mx-1 border-2">Penthouse</option>
                        <option className="mx-1 border-2">Studio</option>
                        <option className="mx-1 border-2">Farmhouse</option>
                    </select>
                </div>

                <div className="m-2">
                    <input
                        type="search"
                        name={"searchKey"}
                        value={searchKey}
                        className="block border-2 rounded-md text-black leading-6 px-[1rem] py-1 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        placeholder="Search..."
                        aria-label="Search"
                        aria-describedby="button-addon2" onChange={(e) => {
                            setSearchKey(e.target.value);
                        }}/>
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
            </div>
        </>
    )
};

export default FilterBox;
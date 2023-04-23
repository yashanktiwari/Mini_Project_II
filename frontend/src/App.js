// noinspection ES6UnusedImports

import React from 'react';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import Dashboard from "./Pages/Dashboard";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import ProfilePage from "./Pages/ProfilePage";
import WishlistPage from "./Pages/WishlistPage";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";
import AddNewProperty from "./Pages/AddNewProperty";
import SinglePropertyPage from "./Pages/SinglePropertyPage";
import FAQ from "./Pages/FAQ";
import {ToastContainer} from "react-toastify";
import ScrollToTop from "./Components/ScrollToTop";
// import FilterBox from "./Components/FilterBox";
import DateValidationDisablePast from "./Components/DateValidationDisablePast";
// import MultiRangeSlider from "./Components/MultiRangeSlider";

const App = () => {

    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route
                        exact
                        path='/'
                        element= <HomePage />
                    />
                    <Route
                        exact
                        path='/signupu'
                        element=<SignupPage retailer={false}/>
                    />
                    <Route
                        exact
                        path='/signupr'
                        element=<SignupPage retailer={true}/>
                    />
                    <Route
                        exact
                        path='/dashboard'
                        element= <Dashboard />
                    />
                    <Route
                        exact
                        path='/aboutus'
                        element= <AboutUs />
                    />
                    <Route
                        exact
                        path='/contactus'
                        element= <ContactUs />
                    />
                    <Route
                        exact
                        path='/profile/:id'
                        element= <ProfilePage />
                    />
                    <Route
                        exact
                        path='/wishlist/:id'
                        element= <WishlistPage />
                    />
                    <Route
                        exact
                        path='/privacypolicy'
                        element= <PrivacyPolicy />
                    />
                    <Route
                        exact
                        path='/termsandcondition'
                        element= <TermsAndConditions />
                    />
                    <Route
                        exact
                        path='/FAQ'
                        element= <FAQ />
                    />
                    <Route
                        exact
                        path='/addnewproperty'
                        element= <AddNewProperty />
                    />
                    <Route
                        exact
                        path='/properties/:id'
                        element= <SinglePropertyPage />
                    />
                    <Route
                        exact
                        path='/test'
                        element= <DateValidationDisablePast/>
                        // <MultiRangeSlider
                        // min={0}
                        // max={70000000}
                        // onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                        // />
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
};

export default App;
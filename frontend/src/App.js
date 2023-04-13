import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import Dashboard from "./Pages/Dashboard";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";


const App = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path='/'
                        element= <HomePage />
                    />
                    {/*<Route*/}
                    {/*    exact*/}
                    {/*    path='/login'*/}
                    {/*    element=<LoginPage/>*/}
                    {/*/>*/}
                    <Route
                        exact
                        path='/signup'
                        element=<SignupPage />
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
                </Routes>
            </BrowserRouter>
        </>
    )
};

export default App;

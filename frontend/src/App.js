import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Dashboard from "./Pages/Dashboard";
import AboutUs from "./Pages/AboutUs";


const App = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path='/'
                        element= <Home />
                    />
                    <Route
                        exact
                        path='/login'
                        element=<LoginPage/>
                    />
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
                </Routes>
            </BrowserRouter>
        </>
    )
};

export default App;

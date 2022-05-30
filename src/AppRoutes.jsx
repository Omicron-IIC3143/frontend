import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import RegisterUserPage from './views/RegisterUserPage';



const AppRouter = function AppRouter() {
    return (
        <>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterUserPage />} />
        </Routes>
        </>
    );
};

export default AppRouter;

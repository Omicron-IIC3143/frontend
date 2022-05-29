import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage';



const AppRouter = function AppRouter() {
    return (
        <>
        <Routes>
            <Route path="/" element={<LandingPage />} />
        </Routes>
        </>
    );
};

export default AppRouter;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './views/landingPage/LandingPage';
import ProjectShow from './views/projectShow/ProjectShow';


const AppRouter = function AppRouter() {
    return (
        <>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects/:id" element={<ProjectShow />} />
        </Routes>
        </>
    );
};

export default AppRouter;

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RegisterUserPage from './views/user/RegisterUserPage';
import UpdaterUserPage from './views/user/UpdaterUserPage';
import LandingPage from './views/landingPage/LandingPage';
import ProjectShow from './views/project/projectShow/ProjectShow';
import RegisterProject from './views/project/registerProject/RegisterProject';


const AppRouter = function AppRouter() {
    return (
        <>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterUserPage />} />
            <Route path="/user/update" element={<UpdaterUserPage />} />
            <Route path="/projects/:id" element={<ProjectShow />} />
            <Route path="projectregister" element={<RegisterProject />} />
        </Routes>
        </>
    );
};

export default AppRouter;

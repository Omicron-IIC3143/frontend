import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RegisterUserPage from './views/user/RegisterUserPage';
import UpdaterUserPage from './views/user/UpdaterUserPage';
import LandingPage from './views/landingPage/LandingPage';
import ProjectShow from './views/project/projectShow/ProjectShow';
import RegisterProject from './views/project/registerProject/RegisterProject';
import Login from './views/user/login/Login';
import AuthContextProvider from './contexts/AuthContext';
import UserShow from './views/user/userShow/UserShow';


const AppRouter = function AppRouter() {
    return (
        <AuthContextProvider>
          <Routes>
              <Route path="login" element={<Login />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/projects/:id" element={<ProjectShow />} />
              <Route path="projectregister" element={<RegisterProject />} />
              <Route path="profile" element={<UserShow />} />
              <Route path="/register" element={<RegisterUserPage />} />
              <Route path="/user/update" element={<UpdaterUserPage />} />

          </Routes>
        </AuthContextProvider>
    );
};

export default AppRouter;

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthContextProvider from './contexts/AuthContext';

import RegisterUserPage from './views/user/register/RegisterUserPage';
import LandingPage from './views/landingPage/LandingPage';
import ProjectShow from './views/project/projectShow/ProjectShow';
import RegisterProject from './views/project/registerProject/RegisterProject';
import Login from './views/user/login/Login';
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
          </Routes>
        </AuthContextProvider>
    );
};

export default AppRouter;

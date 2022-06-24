import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RegisterUserPage from './views/user/RegisterUserPage';
import UpdaterUserPage from './views/user/UpdaterUserPage';
import LandingPage from './views/landingPage/LandingPage';
import ShowProject from './views/project/projectShow/ProjectShow';
import RegisterProject from './views/project/registerProject/RegisterProject';
import Login from './views/user/login/Login';
import AuthContextProvider from './contexts/AuthContext';
import ShowUser from './views/user/userShow/ShowUser';
import FinancialInformation from './views/user/financialInformation/FinancialInformation';
import MyProjects from './views/project/myProjects/MyProjects';
import MyFunded from './views/project/myFunded/MyFunded';
import ShowUsersPage from './views/user/showUsers/ShowUsersPage';
import PendingProjects from './views/project/pendingProjects/PendingProjects';
import TermsAndConditions from './views/termsAndConditions/TermsAndConditions';
import UpdateProject from './views/project/updateProject/UpdateProject';

const AppRouter = function AppRouter() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/user/update" element={<UpdaterUserPage />} />
        <Route path="/users" element={<ShowUsersPage />} />
        <Route path="/users/:id" element={<ShowUser />} />
        <Route path="/users/:id/projects" element={<MyProjects />} />
        <Route path="/users/:id/funded" element={<MyFunded />} />
        <Route path="/users/:id/financialinfo" element={<FinancialInformation />} />
        <Route path="projectregister" element={<RegisterProject />} />
        <Route path="/projects/:id" element={<ShowProject />} />
        <Route path="/projects/:id/update" element={<UpdateProject />} />
        <Route path="/projects/pendings" element={<PendingProjects />} />
        <Route path="terms" element={<TermsAndConditions />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default AppRouter;

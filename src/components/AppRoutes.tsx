//AppRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Yoyaku from './Yoyaku';
import YoyakuForm from './ReservationRegisterForm';
import OrganizationForm from './OrganizationRegisterForm';
import OrganizationList from './OrganizationList';
import OrganizationEditForm from './OrganizationEditForm';
import RoomRegisterForm from './RoomRegisterForm';
import RoomList from './RoomList';
import RoomEditForm from './RoomEditForm';
import LoginPage from './LoginPage';
//import FrontPage from './FrontPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Yoyaku />} />
            <Route path="/yoyaku/register" element={<YoyakuForm />} />
            <Route path="/organization/register" element={<OrganizationForm />} />
            <Route path="/organization/list" element={<OrganizationList />} />
            <Route path="/organization/edit/:documentId" element={<OrganizationEditForm />} />
            <Route path="/rooms/register" element={<RoomRegisterForm />} />
            <Route path="/rooms/list" element={<RoomList />} />
            <Route path="/rooms/edit/:documentId" element={<RoomEditForm />} />
            <Route path="/login" element={<LoginPage/>} />
            {/* 他のルート */}
        </Routes>
    );
};

export default AppRoutes;

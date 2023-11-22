//AppRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import YoyakuPage from './pages/YoyakuPage';
import YoyakuForm from './components/forms/Reservation/ReservationRegisterForm';
import ReservationList from './pages/ReservationPage';
import OrganizationForm from './components/forms/Organization/OrganizationRegisterForm';
import OrganizationList from './pages/OrganizationPage';
import OrganizationEditForm from './components/forms/Organization/OrganizationEditForm';
import RoomRegisterForm from './components/forms/Room/RoomRegisterForm';
import RoomList from './pages/RoomPage';
import RoomEditForm from './components/forms/Room/RoomEditForm';
import LoginPage from './pages/LoginPage';
//import FrontPage from './FrontPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<YoyakuPage />} />
            <Route path="/reservations/register" element={<YoyakuForm />} />
            <Route path="/reservations/list" element={<ReservationList />} />
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

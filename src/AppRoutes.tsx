//AppRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import YoyakuPage from './pages/YoyakuPage';
import CalendarPage from './pages/CalendarPage';
import ReservationForm from './components/forms/Reservation/ReservationRegisterForm';
import ReservationList from './pages/ReservationPage';
import OrganizationForm from './components/forms/Organization/OrganizationRegisterForm';
import OrganizationList from './pages/OrganizationPage';
import OrganizationEditForm from './components/forms/Organization/OrganizationEditForm';
import RoomRegisterForm from './components/forms/Room/RoomRegisterForm';
import RoomList from './pages/RoomPage';
import RoomEditForm from './components/forms/Room/RoomEditForm';
import LoginPage from './pages/LoginPage';
import FrontPage from './pages/FrontPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/search" element={<YoyakuPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/reservations/register" element={<ReservationForm />} />
            <Route path="/reservations/list" element={<ReservationList />} />
            { /* <Route path="/reservations/edit/:documentId" element={<ReservationEditForm />} /> */}
            <Route path="/organizations/register" element={<OrganizationForm />} />
            <Route path="/organizations/list" element={<OrganizationList />} />
            <Route path="/organizations/edit/:documentId" element={<OrganizationEditForm />} />
            <Route path="/rooms/register" element={<RoomRegisterForm />} />
            <Route path="/rooms/list" element={<RoomList />} />
            <Route path="/rooms/edit/:documentId" element={<RoomEditForm />} />
            <Route path="/login" element={<LoginPage/>} />
            {/* 他のルート */}
        </Routes>
    );
};

export default AppRoutes;

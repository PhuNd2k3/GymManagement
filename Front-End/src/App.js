import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import HeaderUser from "./components/HeaderUser/HeaderUser";
import HeaderAdmin from "./components/HeaderAdmin/HeaderAdmin";
import Home from "./pages/Home";
import Packages from './pages/Packages';
import AboutUs from './pages/AboutUs';
import TrainingHistory from './pages/TrainingHistory';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import Login from "./pages/Login";
import AdminAttendance from './pages/AdminAttendance';
import AdminGymEquipment from './pages/AdminGymEquipment';
import AdminRegistrationList from './pages/AdminRegistrationList';
import AdminPackages from './pages/AdminPackages';
import AdminFeedback from './pages/AdminFeedback';
import AdminProfile from './pages/AdminProfile';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  const checkLoginStatus = () => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [location]);

  const renderHeader = () => {
    if (location.pathname !== "/login") {
      if (isLoggedIn) {
        if (userRole === "hoivien") {
          return <HeaderUser />;
        } else if (userRole === "quantrivien") {
          return <HeaderAdmin />;
        }
      }
      return <Header />;
    }
    return null;
  };

  return (
    <div className="app">
      <div className="overlay"></div>
      {renderHeader()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
        <Route path="/packages" element={<Packages isLoggedIn={isLoggedIn} />} />
        <Route path="/about-us" element={<AboutUs />} />
        {isLoggedIn && userRole === "hoivien" ? (
          <>
            <Route path="/training-history" element={<TrainingHistory />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          isLoggedIn && userRole === "quantrivien" ? (
            <>
              <Route path="/admin/attendance" element={<AdminAttendance />} />
              <Route path="/admin/gym-equipment" element={<AdminGymEquipment />} />
              <Route path="/admin/registration-list" element={<AdminRegistrationList />} />
              <Route path="/admin/packages" element={<AdminPackages />} />
              <Route path="/admin/feedback" element={<AdminFeedback />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )
        )}
      </Routes>
    </div>
  );
};

export default App;

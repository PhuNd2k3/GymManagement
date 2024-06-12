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
import AdminMembers from "./pages/AdminMembers";
import AdminStats from "./pages/AdminStats";
import Register from "./components/Register/Register";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null); // Thêm userId vào state
  const location = useLocation();

  const checkLoginStatus = () => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    const id = localStorage.getItem('userId');
    if (token && role && id) {
      setIsLoggedIn(true);
      setUserRole(role);
      setUserId(id);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
      setUserId(null);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [location]);

  const renderHeader = () => {
    if (!(location.pathname === "/login" || location.pathname === "/register")) {
      if (isLoggedIn) {
        if (userRole === "hoivien") {
          return <HeaderUser userId={userId} />;
        } else if (userRole === "quantrivien") {
          return <HeaderAdmin userId={userId} />;
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
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} setUserId={setUserId} />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/packages" element={<Packages isLoggedIn={isLoggedIn} />} />
        <Route path="/about-us" element={<AboutUs />} />
        {isLoggedIn && userRole === "hoivien" ? (
          <>
            <Route path="/training-history/:id" element={<TrainingHistory />} />
            <Route path="/feedback/:id" element={<Feedback />} />
            <Route path="/profile/:id" element={<Profile />} />
          </>
        ) : (
          isLoggedIn && userRole === "quantrivien" ? (
            <>
              <Route path="/admin/attendance/:id" element={<AdminAttendance />} />
              <Route path="/admin/members/:id" element={<AdminMembers />} />
              <Route path="/admin/gym-equipment/:id" element={<AdminGymEquipment />} />
              <Route path="/admin/registration-list/:id" element={<AdminRegistrationList />} />
              <Route path="/admin/packages/:id" element={<AdminPackages />} />
              <Route path="/admin/feedback/:id" element={<AdminFeedback />} />
              <Route path="/admin/stats/:id" element={<AdminStats />} />
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

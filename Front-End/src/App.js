import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import HeaderUser from "./components/HeaderUser/HeaderUser";
import Home from "./pages/Home";
import Packages from './pages/Packages';
import AboutUs from './pages/AboutUs';
import Schedule from './pages/Schedule';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import Login from "./pages/Login";

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

  return (
    <div className="app">
      <div className="overlay"></div>
      {console.log(isLoggedIn)}
      {location.pathname !== "/login" && (isLoggedIn && userRole === "hoivien" ? <HeaderUser /> : <Header />)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about-us" element={<AboutUs />} />
        {isLoggedIn ? (
          <>
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  );
};

export default App;

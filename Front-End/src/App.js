import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import HeaderUser from "./components/HeaderUser/HeaderUser";
import Home from "./pages/Home";
import Packages from './pages/Packages';
import AboutUs from './pages/AboutUs';
import TrainingHistory from './pages/TrainingHistory';
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

  const renderHeader = () => {
    if (location.pathname !== "/login") {
      return isLoggedIn && userRole === "hoivien" ? <HeaderUser /> : <Header />;
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
        <Route path="/packages" element={<Packages />} />
        <Route path="/about-us" element={<AboutUs />} />
        {isLoggedIn ? (
          <>
            <Route path="/training-history" element={<TrainingHistory />} />
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

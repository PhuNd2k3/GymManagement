import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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

  // Giả sử có một hàm để kiểm tra trạng thái đăng nhập
  const checkLoginStatus = () => {
    // Giả sử bạn lưu token vào localStorage sau khi người dùng đăng nhập
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   setIsLoggedIn(true);
    // } else {
    //   setIsLoggedIn(false);
    // }
  };

  // Gọi hàm kiểm tra trạng thái đăng nhập khi component được render
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <div className="app">
    <div class="overlay"></div>
    {console.log(isLoggedIn)}
      {isLoggedIn ? <HeaderUser /> : <Header />}
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

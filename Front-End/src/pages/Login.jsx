import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import login_icon from "./../assets/icon/login_icon";
import { Link } from "react-router-dom";
import axios from 'axios';

const Login = ({ setIsLoggedIn, setUserRole, setUserId }) => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (role === "hoivien") {
        response = await axios.post('http://localhost:8080/api/login', {
          phone: email,
          password: password,
        });
      } else if (role === "quantrivien") {
        response = await axios.post('http://localhost:8080/api/admin/login', {
          phone: email,
          password: password,
        });
      }
      
      if (response.data.login) {
        localStorage.setItem("authToken", "fakeAuthToken");
        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", response.data.id); // Lưu ID của người dùng vào localStorage
        setIsLoggedIn(true);
        setUserRole(role);
        setUserId(response.data.id); // Cập nhật state với ID của người dùng
        if (role === "hoivien") {
          navigate(`/training-history/${response.data.id}`);
        } else if (role === "quantrivien") {
          navigate(`/admin/attendance/${response.data.id}`);
        }
      } else {
        alert("Invalid credentials or role.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("An error occurred during login. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login background">
      <div className="login-container">
        <h2 className="login-title">Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="role-selection">
            <label className="role-selection-title">Chọn vai trò:</label>
            <div className="role-options">
              <input
                type="radio"
                id="hoivien"
                name="role"
                value="hoivien"
                onChange={handleRoleChange}
                checked={role === "hoivien"}
              />
              <label htmlFor="hoivien" className={`role-select ${role === "hoivien" ? "role-selected" : ""}`}>
                <img src={login_icon.user} alt="Hội viên" title="Hội viên" className="login-icon" />
                <p>Hội viên</p>
              </label>

              <input
                type="radio"
                id="quantrivien"
                name="role"
                value="quantrivien"
                onChange={handleRoleChange}
                checked={role === "quantrivien"}
              />
              <label htmlFor="quantrivien" className={`role-select ${role === "quantrivien" ? "role-selected" : ""}`}>
                <img src={login_icon.admin} alt="Quản trị viên" title="Quản trị viên" className="login-icon" />
                <p>Quản trị viên</p>
              </label>
            </div>
          </div>

          <div className="input-container">
            <input
              type="text"
              id="email-or-phone"
              name="email-or-phone"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email-or-phone" className="label">Email hoặc Số điện thoại:</label>
            <div className="underline"></div>
          </div>

          <div className="input-container">
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="label">Mật khẩu:</label>
            <div className="underline"></div>
          </div>

          <button type="submit" className="login-btn">Đăng Nhập</button>
        </form>
        <Link to="/">Quên mật khẩu</Link>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="register background">
      <div className="register-container">
        <h2 className="register-title">Đăng Ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              id="phone"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone" className="label">
              Số điện thoại:
            </label>
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
            <label htmlFor="password" className="label">
              Mật khẩu:
            </label>
            <div className="underline"></div>
          </div>

          <div className="input-container">
            <input
              type="date"
              id="dob"
              name="dob"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="."
            />
            <label htmlFor="dob" className="label">
              Ngày sinh:
            </label>
            <div className="underline"></div>
          </div>

          <div className="input-container">
            <input
              type="text"
              id="fullname"
              name="fullname"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <label htmlFor="fullname" className="label">
              Họ và tên:
            </label>
            <div className="underline"></div>
          </div>

          <div className="input-container">
            <select
              id="gender"
              name="gender"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value=""></option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            <label htmlFor="gender" className="label">
              Giới tính:
            </label>
            <div className="underline"></div>
          </div>

          <button type="submit" className="register-btn">
            Đăng Ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

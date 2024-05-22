import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";

const HeaderUser = () => {
  return (
    <section id="header" className="header">
      <div className="container">
        <div className="top-bar">
          <Logo />
          <nav>
            <ul>
              <li>
                <NavLink exact to="/" activeClassName="active">
                  TRANG CHỦ
                </NavLink>
              </li>
              <li>
                <NavLink to="/packages" activeClassName="active">
                  CÁC GÓI TẬP
                </NavLink>
              </li>
              <li>
                <NavLink to="/about-us" activeClassName="active">
                  VỀ CHÚNG TÔI
                </NavLink>
              </li>
              <li>
                <NavLink to="/schedule" activeClassName="active">
                  QUẢN LÝ LỊCH TẬP
                </NavLink>
              </li>
              <li>
                <NavLink to="/feedback" activeClassName="active">
                  PHẢN HỒI
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" activeClassName="active">
                  THÔNG TIN CÁ NHÂN
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="nav-act">
            <Link to="/" onClick={() => {
              localStorage.removeItem("authToken");
              localStorage.removeItem("userRole");
              window.location.reload();
            }}>
              <button className="btn btn-login">ĐĂNG XUẤT</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderUser;

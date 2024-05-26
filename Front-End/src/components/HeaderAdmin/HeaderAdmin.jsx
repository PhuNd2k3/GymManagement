import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";

const HeaderUser = () => {
  const location = useLocation();
  const [isProfileActive, setIsProfileActive] = useState(false);

  useEffect(() => {
    setIsProfileActive(location.pathname === "/admin/profile");
  }, [location.pathname]);

  return (
    <section id="header" className={isProfileActive ? "active-profile header" : "header"}>
      <div className="container">
        <div className="top-bar">
          <Logo />
          <nav>
          <ul>
              <li>
                <NavLink to="/admin/attendance" activeClassName="active">
                  ĐIỂM DANH
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/gym-equipment" activeClassName="active">
                  THIẾT BỊ TẬP
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/registration-list" activeClassName="active">
                  DANH SÁCH ĐĂNG KÝ
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/packages" activeClassName="active">
                  CÁC GÓI TẬP
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/feedback" activeClassName="active">
                  PHẢN HỒI
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/profile" activeClassName="active">
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

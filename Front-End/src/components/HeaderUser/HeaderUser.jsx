import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";

const HeaderUser = () => {
  const location = useLocation();
  const [isProfileActive, setIsProfileActive] = useState(false);

  useEffect(() => {
    // Kiểm tra xem địa chỉ URL hiện tại có phải là /profile không
    setIsProfileActive(location.pathname === "/profile");
  }, [location.pathname]);

  return (
    <section id="header" className={isProfileActive ? "active-profile header" : "header"}>
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
                <NavLink to="/training-history" activeClassName="active">
                  LỊCH SỬ ĐI TẬP
                </NavLink>
              </li>
              <li>
                <NavLink to="/feedback" activeClassName="active">
                  PHẢN HỒI
                </NavLink>
              </li>
              <li>
                <NavLink to="/about-us" activeClassName="active">
                  VỀ CHÚNG TÔI
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

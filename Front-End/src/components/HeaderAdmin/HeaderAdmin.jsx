import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
const HeaderAdmin = ({ userId }) => {
  const location = useLocation();
  const [isProfileActive, setIsProfileActive] = useState(false);

  useEffect(() => {
    setIsProfileActive(location.pathname === `/admin/profile/${userId}`);
  }, [location.pathname, userId]);

  return (
    <section id="header" className={isProfileActive ? "active-profile header" : "header"}>
      <div className="container">
        <div className="top-bar">
          <Logo />
          <nav>
            <ul>
              <li>
                <NavLink to={`/admin/attendance/${userId}`} activeClassName="active">
                  ĐIỂM DANH
                </NavLink>
              </li>
              <li>
                <NavLink to={`/admin/members/${userId}`} activeClassName="active">
                  NGƯỜI DÙNG
                </NavLink>
              </li>
              <li>
                <NavLink to={`/admin/gym-equipment/${userId}`} activeClassName="active">
                  THIẾT BỊ TẬP
                </NavLink>
              </li>
              <li>
                <NavLink to={`/admin/registration-list/${userId}`} activeClassName="active">
                  DANH SÁCH ĐĂNG KÝ
                </NavLink>
              </li>
              <li>
                <NavLink to={`/admin/packages/${userId}`} activeClassName="active">
                  CÁC GÓI TẬP
                </NavLink>
              </li>
              <li>
                <NavLink to={`/admin/feedback/${userId}`} activeClassName="active">
                  PHẢN HỒI
                </NavLink>
              </li>
              <li>
                <NavLink to={`/admin/stats/${userId}`} activeClassName="active">
                  THỐNG KÊ
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

export default HeaderAdmin;

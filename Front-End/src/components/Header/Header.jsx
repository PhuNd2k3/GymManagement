import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";

const Header = () => {
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
            </ul>
          </nav>
          <div className="nav-act">
            <Link to="/login">
              <button className="btn btn-login">ĐĂNG NHẬP</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-login">ĐĂNG KÝ</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;

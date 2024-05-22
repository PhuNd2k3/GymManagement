import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";

const HeaderUser = () => {
    return (
        <>
            <section id="header" className="header">
                <div className="container">
                    <div className="top-bar">
                        <Logo />
                        <nav>
                            <ul>
                                <li>
                                    <NavLink
                                        exact
                                        to="/"
                                        activeClassName="active"
                                    >
                                        Trang Chủ
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/packages"
                                        activeClassName="active"
                                    >
                                        Các Gói Tập
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/about-us"
                                        activeClassName="active"
                                    >
                                        Về Chúng Tôi
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/schedule"
                                        activeClassName="active"
                                    >
                                        Quản Lý Lịch Tập
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/feedback"
                                        activeClassName="active"
                                    >
                                        Phản Hồi
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/profile"
                                        activeClassName="active"
                                    >
                                        Thông Tin Cá Nhân
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <div className="nav-act">
                        <Link to="/">
                            <button className="btn btn-login">ĐĂNG XUẤT</button>
                        </Link>
                    </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeaderUser;

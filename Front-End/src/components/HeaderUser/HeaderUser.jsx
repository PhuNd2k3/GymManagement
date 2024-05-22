import React from "react";
import { NavLink } from "react-router-dom";

const HeaderUser = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to="/" activeClassName="active">
                        Trang Chủ
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/packages" activeClassName="active">
                        Các Gói Tập
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about-us" activeClassName="active">
                        Về Chúng Tôi
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/schedule" activeClassName="active">
                        Quản Lý Lịch Tập
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/feedback" activeClassName="active">
                        Phản Hồi
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" activeClassName="active">
                        Thông Tin Cá Nhân
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderUser;

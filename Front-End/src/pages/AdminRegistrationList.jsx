import React, { useState } from "react";
import all_imgs from "../assets/img/all_imgs";

const AdminRegistrationList = () => {
    // State to store the value of the search bar
    const [searchTerm, setSearchTerm] = useState("");

    // Sample member list
    const members = [
        {
            name: "Nguyễn Văn A",
            sex: "Nam",
            age: 18,
            phone: "0123456789",
            img: all_imgs.gym_equipment,
            packageName: "Gói Basic",
            paymentMethod: "Credit Card",
        },
        {
            name: "Nguyễn Đức Phú",
            sex: "Nam",
            age: 18,
            phone: "0123456789",
            img: all_imgs.gym_equipment,
            packageName: "Gói Standard",
            paymentMethod: "PayPal",
        },
        {
            name: "Nguyễn Trọng Khánh Duy",
            sex: "Nam",
            age: 18,
            phone: "0123456789",
            img: all_imgs.gym_equipment,
            packageName: "Gói Premium",
            paymentMethod: "Bank Transfer",
        },
        {
            name: "Chu Đình Hiển",
            sex: "Nam",
            age: 18,
            phone: "0123456789",
            img: all_imgs.gym_equipment,
            packageName: "Gói Basic",
            paymentMethod: "Cash",
        },
        {
            name: "Phạm Mai Chi",
            sex: "Nữ",
            age: 18,
            phone: "0123456789",
            img: all_imgs.gym_equipment,
            packageName: "Gói Standard",
            paymentMethod: "Credit Card",
        },
        // Add other members here
    ];

    // Function to handle search bar changes
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="registration-list background">
            <div className="container">
                <div className="registration-list-row">
                    <h1 className="registration-list-title">
                        DANH SÁCH ĐĂNG KÝ
                    </h1>
                    <div className="group">
                        <svg
                            className="icon"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                        >
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                            </g>
                        </svg>
                        <input
                            placeholder="Search"
                            type="search"
                            className="input"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="member-list">
                    {members
                        .filter((member) =>
                            member.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        )
                        .map((member, index) => (
                            <div className="member-item" key={index}>
                                <div className="member-item-left">
                                    <img
                                        src={member.img}
                                        alt=""
                                        className="member-avatar"
                                    />
                                    <div className="member-info">
                                        <p className="member-name">
                                            {member.name}
                                        </p>
                                        <p className="member-sex-old">
                                            {member.sex} {member.age} tuổi
                                        </p>
                                        <p className="member-phone">
                                            {member.phone}
                                        </p>
                                    </div>
                                </div>
                                <div className="member-item-right">
                                    <div className="registration-list-package">
                                        <p className="registration-list-package-info">
                                            Đăng ký gói: <strong>{member.packageName}</strong>
                                        </p>
                                        <p className="registration-list-package-payment-method">
                                            Phương thức thanh toán: <strong>{member.paymentMethod}</strong>
                                        </p>
                                    </div>
                                    <div className="registration-list-act">
                                        <button className="registration-list-btn">
                                            Duyệt
                                        </button>
                                        <button className="registration-list-btn">
                                            Từ chối
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AdminRegistrationList;

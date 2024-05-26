import React, { useState } from "react";
import all_imgs from "../assets/img/all_imgs";

const AdminAttendance = () => {
    // State để lưu trữ giá trị của thanh tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");

    // Danh sách thành viên mẫu
    const members = [
        { name: "Nguyễn Văn A", sex: "Nam", age: 18, phone: "0123456789", img: all_imgs.gym_equipment },
        { name: "Nguyễn Đức Phú", sex: "Nam", age: 18, phone: "0123456789", img: all_imgs.gym_equipment },
        { name: "Nguyễn Trọng Khánh Duy", sex: "Nam", age: 18, phone: "0123456789", img: all_imgs.gym_equipment },
        { name: "Chu Đình Hiển", sex: "Nam", age: 18, phone: "0123456789", img: all_imgs.gym_equipment },
        { name: "Phạm Mai Chi", sex: "Nữ", age: 18, phone: "0123456789", img: all_imgs.gym_equipment },
        { name: "Phạm Mai Chi", sex: "Nữ", age: 18, phone: "0123456789", img: all_imgs.gym_equipment },
        { name: "Phạm Mai Chi", sex: "Nữ", age: 18, phone: "0123456789", img: all_imgs.gym_equipment },
        { name: "Phạm Mai Chi", sex: "Nữ", age: 18, phone: "0123456789", img: all_imgs.gym_equipment },
        { name: "Phạm Mai Chi", sex: "Nữ", age: 18, phone: "0123456789", img: all_imgs.gym_equipment },
        { name: "Phạm Mai Chi", sex: "Nữ", age: 18, phone: "0123456789", img: all_imgs.gym_equipment },
        // Thêm các thành viên khác ở đây
    ];

    // Hàm xử lý sự kiện thay đổi của thanh tìm kiếm
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="attendance background">
            <div className="container">
                <div className="attendance-row">
                    <h1 className="attendance-title">ĐIỂM DANH</h1>
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
                            member.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((member, index) => (
                            <div className="member-item" key={index}>
                                <div className="member-item-left">
                                    <img src={member.img} alt="" className="member-avatar" />
                                    <div className="member-info">
                                        <p className="member-name">{member.name}</p>
                                        <p className="member-sex-old">{member.sex} {member.age} tuổi</p>
                                        <p className="member-phone">{member.phone}</p>
                                    </div>
                                </div>
                                <div className="member-item-left right">
                                    <button className="attendance-btn">
                                        Điểm danh
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AdminAttendance;

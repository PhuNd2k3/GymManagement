import React, { useState, useEffect } from "react";
import all_imgs from "../assets/img/all_imgs";
import axios from "axios";
import { message } from "antd";

const AdminAttendance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState([]);

  const fetchMembers = () => {
    axios
      .get("http://localhost:8080/api/member/all")
      .then((response) => {
        const membersFromAPI = response.data.map((member) => ({
          id: member.id,
          name: member.fullName,
          sex: member.gender,
          age: new Date().getFullYear() - new Date(member.dob).getFullYear(),
          phone: member.phoneNumber,
          trainingToday: member.trainingToday,
          img: all_imgs.gym_equipment,
        }));
        setMembers(membersFromAPI);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAttendance = (id, name) => {
    axios
      .put(`http://localhost:8080/api/training/add/${id}`)
      .then((response) => {
        message.success(`Điểm danh thành công cho thành viên: ${name}`);
        fetchMembers();
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert("Người này đã điểm danh.");
        } else {
          console.error("Error marking attendance:", error);
        }
      });
  };

  return (
    <div className="attendance background">
      <div className="container">
        <div className="attendance-row">
          <h1 className="attendance-title">ĐIỂM DANH</h1>
          <div className="group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
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
            .map((member, index) =>
              member.trainingToday ? null : (
                <div className="member-item" key={index}>
                  <div className="member-item-left">
                    <img src={member.img} alt="" className="member-avatar" />
                    <div className="member-info">
                      <p className="member-name">{member.name}</p>
                      <p className="member-sex-old">
                        {member.sex} {member.age} tuổi
                      </p>
                      <p className="member-phone">{member.phone}</p>
                    </div>
                  </div>
                  <div className="member-item-right">
                    <button
                      className="attendance-btn"
                      onClick={() => handleAttendance(member.id, member.name)}
                    >
                      Điểm danh
                    </button>
                  </div>
                </div>
              )
            )}
          {members
            .filter((member) =>
              member.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((member, index) =>
              !member.trainingToday ? null : (
                <div className="member-item" key={index}>
                  <div className="member-item-left">
                    <img src={member.img} alt="" className="member-avatar" />
                    <div className="member-info">
                      <p className="member-name">{member.name}</p>
                      <p className="member-sex-old">
                        {member.sex} {member.age} tuổi
                      </p>
                      <p className="member-phone">{member.phone}</p>
                    </div>
                  </div>
                  <div className="member-item-right">
                    <button className="attendance-btn attendanced">
                      Đã điểm danh
                    </button>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;

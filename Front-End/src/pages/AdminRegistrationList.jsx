import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Modal, message } from "antd";
import all_imgs from "../assets/img/all_imgs";

const AdminRegistrationList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch data from API
    axios
      .get("http://localhost:8080/api/membership/register_list")
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const notificationReject = (member) => {
    Modal.confirm({
      title: "Xác nhận từ chối",
      content: (
        <>
          Bạn chắc chắn muốn từ chối cho{" "}
          <strong style={{ color: "red" }}>{member.fullName} </strong>
          {member.currentMembership ? (
            <>
              thay đổi gói{" "}
              <strong style={{ color: "red" }}>
                {member.currentMembership}
              </strong>{" "}
              thành{" "}
              <strong style={{ color: "red" }}>
                {member.registerMembership}
              </strong>
            </>
          ) : (
            <>
              đăng ký gói{" "}
              <strong style={{ color: "red" }}>
                {member.registerMembership}
              </strong>
            </>
          )}
          ?
        </>
      ),
      okText: "Từ chối",
      cancelText: "Hủy",
      onOk: (status) => {
        updateMembershipStatus(member, "Reject");
        Modal.destroyAll();
      },
    });
  };

  const notificationAccepted = (member) => {
    Modal.confirm({
      title: "Xác nhận duyệt",
      content: (
        <>
          Bạn chắc chắn muốn duyệt cho{" "}
          <strong style={{ color: "red" }}>{member.fullName} </strong>
          {member.currentMembership ? (
            <>
              thay đổi gói{" "}
              <strong style={{ color: "red" }}>
                {member.currentMembership}
              </strong>{" "}
              thành{" "}
              <strong style={{ color: "red" }}>
                {member.registerMembership}
              </strong>
            </>
          ) : (
            <>
              đăng ký gói{" "}
              <strong style={{ color: "red" }}>
                {member.registerMembership}
              </strong>
            </>
          )}
          ?
        </>
      ),
      okText: "Duyệt",
      cancelText: "Hủy",
      onOk: (status) => {
        updateMembershipStatus(member, "Accepted");
        Modal.destroyAll();
      },
    });
  };

  const updateMembershipStatus = (member, status) => {
    const data = {
      id: member.id,
      memberId: member.memberId,
      membershipId: member.registerMembershipId,
      status: status,
      paymentMethod: member.paymentMethod,
    };

    axios
      .put("http://localhost:8080/api/membership/update_register", data)
      .then((response) => {
        console.log("Update successful:", response.data);
        // Optionally update the local state to reflect the change immediately
        {
          data.status === "Accepted"
            ? message.success("Đã duyệt!")
            : message.success("Đã từ chối!");
        }
        setMembers((prevMembers) =>
          prevMembers.filter((m) => m.id !== member.id)
        );
      })
      .catch((error) => {
        console.error("Error updating membership status:", error);
        console.log(data);
      });
  };

  return (
    <div className="registration-list background">
      <div className="container">
        <div className="registration-list-row">
          <h1 className="registration-list-title">DANH SÁCH ĐĂNG KÝ</h1>
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
              member.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((member, index) => (
              <div className="member-item" key={index}>
                <div className="member-item-left">
                  <img
                    src={all_imgs.gym_equipment}
                    alt=""
                    className="member-avatar"
                  />
                  <div className="member-info">
                    <p className="member-name">{member.fullName}</p>
                    <p className="member-sex-old">
                      {member.sex}{" "}
                      {new Date().getFullYear() -
                        new Date(member.dob).getFullYear()}{" "}
                      tuổi
                    </p>
                    <p className="member-phone">{member.phoneNumber}</p>
                  </div>
                </div>
                <div className="member-item-right">
                  <div className="registration-list-package">
                    <p className="registration-list-package-info">
                      {member.currentMembership ? (
                        <>
                          Đổi gói&nbsp;
                          <strong>{member.currentMembership}</strong>&nbsp;
                          thành&nbsp;
                          <strong>{member.registerMembership}</strong>
                        </>
                      ) : (
                        <>
                          Đăng ký gói:&nbsp;
                          <strong>{member.registerMembership}</strong>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="registration-list-act">
                    <button
                      className="registration-list-btn registration-list-btn-reject"
                      onClick={() =>
                        // updateMembershipStatus(member, "Reject")
                        notificationReject(member)
                      }
                    >
                      Từ chối
                    </button>
                    <button
                      className="registration-list-btn registration-list-btn-accept"
                      onClick={() =>
                        // updateMembershipStatus(member, "Accepted")
                        notificationAccepted(member)
                      }
                    >
                      Duyệt
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

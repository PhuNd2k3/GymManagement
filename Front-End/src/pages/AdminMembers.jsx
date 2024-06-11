import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Input, DatePicker, Select, message, Pagination } from "antd";
import moment from "moment";
import all_imgs from "../assets/img/all_imgs";

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [newMember, setNewMember] = useState({
    fullName: "",
    dob: null,
    sex: "",
    phoneNumber: "",
    membershipName: "",
    email: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/member/all")
      .then((response) => {
        const membersFromAPI = response.data.map((member) => ({
          id: member.id,
          fullName: member.fullName,
          sex: member.gender,
          dob: member.dob,
          phoneNumber: member.phoneNumber,
          img: all_imgs.gym_equipment,
          membershipName: member.membershipName,
          email: member.email,
        }));
        setMembers(membersFromAPI);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });

    axios
      .get("http://localhost:8080/api/membership")
      .then((response) => {
        setMemberships(response.data);
      })
      .catch((error) => {
        console.error("Error fetching memberships:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredMembers = members.filter(
    (member) =>
      member.fullName &&
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (member) => {
    setSelectedMember(member);
    setNewMember({
      fullName: member.fullName,
      dob: member.dob ? moment(member.dob) : null,
      sex: member.sex,
      phoneNumber: member.phoneNumber,
      membershipName: member.membershipName,
      email: member.email,
    });
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedMember(null);
    setNewMember({
      fullName: "",
      dob: null,
      sex: "",
      phoneNumber: "",
      membershipName: "",
      email: "",
    });
    setModalType("add");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa người dùng này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        axios
          .delete(`http://localhost:8080/api/member/delete/${id}`)
          .then((response) => {
            setMembers(members.filter((member) => member.id !== id));
            message.success("Xóa thành công!");
          })
          .catch((error) => {
            console.error("Error deleting member:", error);
          });
      },
    });
  };

  const handleOk = () => {
    const selectedMembership = memberships.find(
      (m) => m.name === newMember.membershipName
    );

    const formattedDob = newMember.dob
      ? newMember.dob.format("YYYY-MM-DD")
      : null;

    if (modalType === "edit") {
      const memberData = {
        id: selectedMember.id,
        fullName: newMember.fullName,
        email: newMember.email,
        gender: newMember.sex,
        dob: formattedDob,
        phoneNumber: newMember.phoneNumber,
        membershipId: selectedMembership ? selectedMembership.id : null,
      };

      axios
        .put("http://localhost:8080/api/member/update", memberData)
        .then((response) => {
          const updatedMembers = members.map((member) =>
            member.id === selectedMember.id
              ? { ...member, ...newMember, dob: formattedDob }
              : member
          );
          setMembers(updatedMembers);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Error updating member:", error);
        });
    } else if (modalType === "add") {
      const memberData = {
        fullName: newMember.fullName,
        email: newMember.email,
        gender: newMember.sex,
        dob: formattedDob,
        phoneNumber: newMember.phoneNumber,
        membershipId: selectedMembership ? selectedMembership.id : null,
      };

      axios
        .post("http://localhost:8080/api/member/add", memberData)
        .then((response) => {
          setMembers([...members, response.data]);
          setIsModalOpen(false);
          message.success("Thêm thành công!");
        })
        .catch((error) => {
          console.error("Error adding new member:", error);
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentMembers = filteredMembers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="admin-member background">
      <div className="container">
        <div className="admin-member-row">
          <h1 className="registration-list-title">DANH SÁCH NGƯỜI DÙNG</h1>
          <div style={{ display: "flex", gap: "20px" }}>
            <button onClick={handleAddNew}>THÊM MỚI</button>
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
        </div>
        <div className="admin-member-list">
          {currentMembers.map((member) => (
            <div className="admin-member-item" key={member.id}>
              <div className="admin-member-item-left">
                <img src={member.img} alt="" className="admin-member-avatar" />
                <div className="admin-member-info">
                  <p className="admin-member-name">{member.fullName}</p>
                  <p className="admin-member-sex-old">
                    {member.sex}{" "}
                    {new Date().getFullYear() -
                      new Date(member.dob).getFullYear()}{" "}
                    tuổi
                  </p>
                  <p className="admin-member-phone">{member.phoneNumber}</p>
                  {/* <p className="admin-member-email">{member.email}</p> */}
                </div>
              </div>
              <div className="admin-member-act">
                <button
                  className="admin-member-btn admin-member-delete"
                  onClick={() => handleDelete(member.id)}
                >
                  Xóa
                </button>
                <button
                  className="admin-member-btn admin-member-edit"
                  onClick={() => handleEdit(member)}
                >
                  Sửa
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredMembers.length}
          onChange={handlePageChange}
          showSizeChanger={false}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />
      </div>
      <Modal
        title={
          modalType === "edit" ? "CHỈNH SỬA NGƯỜI DÙNG" : "THÊM MỚI NGƯỜI DÙNG"
        }
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={modalType === "edit" ? "CHỈNH SỬA" : "THÊM MỚI"}
        cancelText="HỦY"
        className="admin-member-modal"
        width={700}
      >
        <form className="form">
          <div className="form-left">
            <div className="form-group">
              <label htmlFor="memberName">Tên người dùng:</label>
              <Input
                id="memberName"
                value={newMember.fullName}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    fullName: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="memberDOB">Ngày sinh:</label>
              <DatePicker
                id="memberDOB"
                value={newMember.dob}
                onChange={(date) => setNewMember({ ...newMember, dob: date })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="memberSex">Giới tính:</label>
              <Select
                id="memberSex"
                value={newMember.sex}
                onChange={(value) =>
                  setNewMember({
                    ...newMember,
                    sex: value,
                  })
                }
              >
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
              </Select>
            </div>
            <div className="form-group">
              <label htmlFor="memberPhoneNumber">Số điện thoại:</label>
              <Input
                id="memberPhoneNumber"
                value={newMember.phoneNumber}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="memberEmail">Email:</label>
              <Input
                id="memberEmail"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="memberMembership">Gói tập:</label>
              <Select
                id="memberMembership"
                value={newMember.membershipName}
                onChange={(value) =>
                  setNewMember({
                    ...newMember,
                    membershipName: value,
                  })
                }
              >
                {memberships.map((membership) => (
                  <Select.Option key={membership.id} value={membership.name}>
                    {membership.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminMembers;

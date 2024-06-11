import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Input, DatePicker, InputNumber, message } from "antd";
import GymEquipment from "../components/GymEquipment/GymEquipment";
import all_imgs from "../assets/img/all_imgs";
import login_icon from "../assets/icon/login_icon";

const AdminGymEquipment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState(login_icon.form_avatar);
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    date: null,
    quantity: 0,
    description: "",
  });
  const [gymEquipment, setGymEquipment] = useState([]);

  const fetchGymEquipment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/equipment/all"
      );
      setGymEquipment(response.data);
    } catch (error) {
      console.error("Error fetching gym equipment data:", error);
    }
  };

  useEffect(() => {
    fetchGymEquipment();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAddEquipment = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleAddEquipmentSubmit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const updateEquipmentName = (id, newName) => {
    setGymEquipment((prevEquipment) => {
      return prevEquipment.map((equipment) => {
        if (equipment.id === id) {
          return { ...equipment, equipmentName: newName };
        } else {
          return equipment;
        }
      });
    });
  };

  const onDeleteSuccess = (deletedId) => {
    setGymEquipment((prevEquipment) =>
      prevEquipment.filter((equipment) => equipment.id !== deletedId)
    );
  };

  const handleAddEquipmentSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/api/equipment/add", {
        equipmentName: newEquipment.name,
        equipmentQuantity: newEquipment.quantity,
        receiptDate: newEquipment.date,
        equipmentDescription: newEquipment.description,
      });
      setIsModalOpen(false);
      fetchGymEquipment();
    } catch (error) {
      console.error("Error adding equipment:", error);
    }
  };

  return (
    <div className="admin-gym-equipment background">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="search">
            <input
              className="input"
              type="text"
              required
              placeholder="Tìm kiếm gói tập..."
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="fancy-bg"></div>
            <div className="search">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
              >
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </div>
            <button className="close-btn" type="reset">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 011.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </label>
        </form>
        <button onClick={handleAddEquipment} className="add-equipment-btn">
          Thêm thiết bị
        </button>
        <div className="gym-equipment-list">
          {gymEquipment.map((equipment) => (
            <GymEquipment
              key={equipment.id}
              name={equipment.equipmentName}
              imgSrc={all_imgs.gym_equipment}
              initialData={equipment}
              updateName={updateEquipmentName}
              onDeleteSuccess={onDeleteSuccess}
            />
          ))}
        </div>
        <Modal
          title="THÔNG TIN THIẾT BỊ"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="THÊM"
          cancelText="HỦY"
          className="gym-equipment-modal"
          width={700}
        >
          <form className="form">
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="equipmentName">Tên thiết bị:</label>
                <Input
                  id="equipmentName"
                  value={newEquipment.name}
                  onChange={(e) =>
                    setNewEquipment({
                      ...newEquipment,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="equipmentDate">Ngày nhập:</label>
                <DatePicker
                  id="equipmentDate"
                  value={newEquipment.date}
                  onChange={(date) =>
                    setNewEquipment({
                      ...newEquipment,
                      date: date,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="equipmentQuantity">Số lượng:</label>
                <InputNumber
                  id="equipmentQuantity"
                  value={newEquipment.quantity}
                  onChange={(value) =>
                    setNewEquipment({
                      ...newEquipment,
                      quantity: value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="equipmentDescription">Mô tả:</label>
                <Input.TextArea
                  id="equipmentDescription"
                  value={newEquipment.description}
                  onChange={(e) =>
                    setNewEquipment({
                      ...newEquipment,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="form-right">
              <img src={preview} alt="Profile Preview" />
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                onChange={handleFileChange}
              />
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminGymEquipment;

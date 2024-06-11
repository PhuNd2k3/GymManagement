import React, { useState, useEffect } from "react";
import { Modal, Input, DatePicker, InputNumber, message } from "antd";
import axios from "axios";
import moment from "moment";

const GymEquipment = ({ name, imgSrc, initialData, onDeleteSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState(imgSrc);
  const [formData, setFormData] = useState(initialData);
  const [equipmentName, setEquipmentName] = useState(name);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      await axios.put("http://localhost:8080/api/equipment/update", formData);
      setEquipmentName(formData.equipmentName);
    } catch (error) {
      console.error("Error updating equipment:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa thiết bị này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8080/api/equipment/delete/${formData.id}`);
          message.success("Xóa thành công!");
          onDeleteSuccess(formData.id);
        } catch (error) {
          console.error("Error deleting equipment:", error);
        }
      },
    });
  };

  return (
    <div className="gym-equipment">
      <div className="gym-equipment-info">
        <h2 className="gym-equipment-name">{equipmentName}</h2>
        <img src={imgSrc} alt={name} className="gym-equipment-img" />
      </div>
      <div className="gym-equipment-act">
        <div className="btn-remove" onClick={handleDelete}>
          Xóa
        </div>
        <div className="btn-update" onClick={handleUpdateClick}>
          Sửa
        </div>
        <Modal
          title="THÔNG TIN THIẾT BỊ"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="CHỈNH SỬA"
          cancelText="QUAY LẠI"
          className="gym-equipment-modal"
          width={700}
        >
          <form className="form">
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="equipmentName">Tên thiết bị:</label>
                <Input
                  id="equipmentName"
                  value={formData.equipmentName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      equipmentName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="equipmentDate">Ngày nhập:</label>
                <DatePicker
                  id="equipmentDate"
                  value={
                    formData.receiptDate ? moment(formData.receiptDate) : null
                  }
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      receiptDate: date.format("YYYY-MM-DD"),
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="equipmentQuantity">Số lượng:</label>
                <InputNumber
                  id="equipmentQuantity"
                  value={formData.equipmentQuantity}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      equipmentQuantity: value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="equipmentDescription">Mô tả:</label>
                <Input.TextArea
                  id="equipmentDescription"
                  value={formData.equipmentDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      equipmentDescription: e.target.value,
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

export default GymEquipment;

import React, { useState, useEffect } from "react";
import { Modal, Input, DatePicker, InputNumber } from "antd";
import axios from 'axios';
import moment from 'moment';

const GymEquipment = ({ name, imgSrc, initialData, onEditSuccess }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [preview, setPreview] = useState(imgSrc); 
    const [formData, setFormData] = useState(initialData);

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
            await axios.post("http://localhost:8080/api/equipment/add", formData);
            onEditSuccess(); // Gọi callback onEditSuccess sau khi cập nhật thành công
        } catch (error) {
            console.error("Error updating equipment:", error);
            // Handle error
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleUpdateClick = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="gym-equipment">
            <div className="gym-equipment-info">
                <h2 className="gym-equipment-name">{name}</h2>
                <img src={imgSrc} alt={name} className="gym-equipment-img" />
            </div>
            <div className="gym-equipment-act">
                <div className="btn-remove">Xóa</div>
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
                                <label htmlFor="equipmentName">
                                    Tên thiết bị:
                                </label>
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
                                <label htmlFor="equipmentDate">
                                    Ngày nhập:
                                </label>
                                <DatePicker 
                                    id="equipmentDate" 
                                    value={formData.receiptDate ? moment(formData.receiptDate) : null} 
                                    onChange={(date) =>
                                        setFormData({
                                            ...formData,
                                            receiptDate: date.format("YYYY-MM-DD"),
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="equipmentQuantity">
                                    Số lượng:
                                </label>
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
                                <label htmlFor="equipmentDescription">
                                    Mô tả:
                                </label>
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

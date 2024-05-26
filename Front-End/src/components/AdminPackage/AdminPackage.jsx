import React, { useState } from "react";
import axios from 'axios';
import { Modal, Input, InputNumber } from 'antd';

const AdminPackage = ({
    id,
    name: initialName,
    price: initialPrice,
    numbersOfTrainingPerWeek: initialTrainingFrequency,
    memberCount,
    period,
    onRemove
}) => {
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        membershipName: initialName,
        membershipPrice: initialPrice,
        membershipPeriod: period,
        trainingFrequency: initialTrainingFrequency,
    });

    const [name, setName] = useState(initialName);
    const [price, setPrice] = useState(initialPrice);
    const [numbersOfTrainingPerWeek, setNumbersOfTrainingPerWeek] = useState(initialTrainingFrequency);
    const [membershipPeriod, setMembershipPeriod] = useState(period);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/membership/delete/${id}`);
            setDeleteSuccess(true);
            onRemove(id);
        } catch (error) {
            console.error("Error deleting package:", error);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/membership/update`, {
                id: id,
                numberOfTrainingPerWeek: formData.trainingFrequency,
                name: formData.membershipName,
                price: formData.membershipPrice,
                period: formData.membershipPeriod
            });
            setName(formData.membershipName);
            setPrice(formData.membershipPrice);
            setNumbersOfTrainingPerWeek(formData.trainingFrequency);
            setMembershipPeriod(formData.membershipPeriod);

            console.log("Package updated successfully:", response.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating package:", error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="package-item">
            <div className="package-info">
                <h3 className="package-name">{name}</h3>
                <p className="package-price">
                    Giá: <strong>${price}</strong>
                </p>
                <p className="package-frequency">
                    Tần suất tập: <strong>{numbersOfTrainingPerWeek}</strong> buổi / tuần
                </p>
                <p className="package-number">
                    Số người tập: <strong>{memberCount}</strong> người
                </p>
                <p className="package-number">
                    Thời hạn: <strong>{membershipPeriod}</strong> ngày
                </p>
            </div>
            <div className="package-act">
                <button className="package-act-remove" onClick={handleDelete}>
                    XÓA
                </button>
                <button className="package-act-update" onClick={showModal}>
                    SỬA
                </button>
                <Modal
                    title="THÔNG TIN GÓI TẬP"
                    visible={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="CHỈNH SỬA"
                    cancelText="QUAY LẠI"
                    className="membership-modal"
                    width={500}
                >
                    <form className="form">
                        <div className="form-left">
                            <div className="form-group">
                                <label htmlFor="membershipName">Tên gói tập:</label>
                                <Input
                                    id="membershipName"
                                    value={formData.membershipName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            membershipName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="membershipPrice">Giá</label>
                                <InputNumber
                                    id="membershipPrice"
                                    value={formData.membershipPrice}
                                    onChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            membershipPrice: value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="trainingFrequency">Tần suất tập:</label>
                                <InputNumber
                                    id="trainingFrequency"
                                    value={formData.trainingFrequency}
                                    onChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            trainingFrequency: value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="membershipPeriod">Thời hạn:</label>
                                <InputNumber
                                    id="membershipPeriod"
                                    value={formData.membershipPeriod}
                                    onChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            membershipPeriod: value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
            {deleteSuccess && (
                <div className="notification">Đã xóa thành công gói {name}</div>
            )}
        </div>
    );
};

export default AdminPackage;

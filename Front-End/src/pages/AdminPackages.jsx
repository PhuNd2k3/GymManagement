import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Input, InputNumber, message } from "antd";
import AdminPackage from "../components/AdminPackage/AdminPackage";

const AdminPackages = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [packagesData, setPackagesData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        membershipName: "",
        membershipPrice: null,
        trainingFrequency: null,
        membershipPeriod: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/membership");
                setPackagesData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const filteredPackages = packagesData.filter((packageData) =>
        packageData.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemovePackage = (id) => {
        setPackagesData(packagesData.filter((packageData) => packageData.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleOk = async () => {
        const newPackage = {
            numbersOfTrainingPerWeek: formData.trainingFrequency,
            name: formData.membershipName,
            price: formData.membershipPrice,
            period: formData.membershipPeriod,
            memberCount: 0 // Set memberCount to 0
        };

        try {
            const response = await axios.post("http://localhost:8080/api/membership/add", newPackage);
            setPackagesData([...packagesData, response.data]);
            setIsModalOpen(false);
            setFormData({
                membershipName: "",
                membershipPrice: null,
                trainingFrequency: null,
                membershipPeriod: null
            });
            message.success("Thêm thành công!");
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="admin-packages packages background">
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
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 011.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </label>
                </form>
                <div style={{ display: "flex" }}>
                    <button className="packages-add-btn" onClick={() => setIsModalOpen(true)}>
                        Thêm gói tập mới
                    </button>
                    <Modal
                        title="THÔNG TIN GÓI TẬP"
                        visible={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText="THÊM"
                        cancelText="HỦY"
                        className="add-membership-modal"
                        width={700}
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
                <div className="packages-list">
                    {filteredPackages.map((packageData) => (
                        <AdminPackage
                            key={packageData.id}
                            {...packageData}
                            onRemove={handleRemovePackage}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPackages;

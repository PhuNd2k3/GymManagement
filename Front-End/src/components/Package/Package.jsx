import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Radio } from "antd";

const Package = ({
    name,
    price,
    numbersOfTrainingPerWeek,
    memberCount,
    isLoggedIn,
}) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("bankCard"); // Default payment method

    const handlePackageClick = () => {
        if (!isLoggedIn) {
            alert("Bạn cần phải đăng nhập để thanh toán.");
            navigate("/login");
        } else {
            setIsModalOpen(true);
        }
    };

    const handleOk = () => {
        // Handle the payment logic here based on the selected payment method
        if (paymentMethod === "bankCard") {
            // Logic for bank card payment
            console.log("Thanh toán bằng thẻ ngân hàng");
        } else if (paymentMethod === "cashOnDelivery") {
            // Logic for cash on delivery
            console.log("Thanh toán tại nhà");
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onPaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div className="package-item">
            <div className="package-info">
                <h3 className="package-name">{name}</h3>
                <p className="package-price">
                    Giá: <strong>${price}</strong>
                </p>
                <p className="package-frequency">
                    Tần suất tập: <strong>{numbersOfTrainingPerWeek}</strong>{" "}
                    buổi / tuần
                </p>
                <p className="package-number">
                    Số người tập: <strong>{memberCount}</strong> người
                </p>
            </div>
            <>
                <button className="package-btn" onClick={handlePackageClick}>
                    CHỌN GÓI
                </button>
                <Modal
                    title="THANH TOÁN"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    className="payment"
                    okText="THANH TOÁN"
                    cancelText="QUAY LẠI"
                >
                    <h2 className="payment-title">Gói tập đã chọn</h2>
                    <div className="payment-info">
                        <div className="payment-name">{name}</div>
                        <div className="payment-price">
                            THÀNH TIỀN: <strong>${price}</strong>
                        </div>
                    </div>
                    <div className="payment-act">
                        <div className="payment-methods">
                            <Radio.Group
                                onChange={onPaymentMethodChange}
                                value={paymentMethod}
                            >
                                <Radio value="bankCard">Thẻ ngân hàng</Radio>
                                <Radio value="cashOnDelivery">
                                    Thanh toán tại nhà
                                </Radio>
                            </Radio.Group>
                        </div>
                    </div>
                </Modal>
            </>
        </div>
    );
};

export default Package;

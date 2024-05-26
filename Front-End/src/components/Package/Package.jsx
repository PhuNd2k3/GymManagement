import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Radio, Select, Input, DatePicker } from "antd";

const { Option } = Select;

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
    const [selectedBank, setSelectedBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [expiryDate, setExpiryDate] = useState(null);

    const handlePackageClick = () => {
        if (!isLoggedIn) {
            alert("Bạn cần phải đăng nhập để thanh toán.");
            navigate("/login");
        } else {
            setIsModalOpen(true);
        }
    };

    const handleOk = () => {
        if (paymentMethod === "bankCard") {
            if (!selectedBank || !accountNumber || !cvv || !expiryDate) {
                alert("Vui lòng điền đầy đủ thông tin thanh toán.");
                return;
            }
            console.log("Thanh toán bằng thẻ ngân hàng");
            console.log("Ngân hàng: ", selectedBank);
            console.log("Số tài khoản: ", accountNumber);
            console.log("CVV: ", cvv);
            console.log("Ngày hết hạn: ", expiryDate.format("MM/YYYY"));
        } else if (paymentMethod === "cashOnDelivery") {
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

    const handleBankChange = (value) => {
        setSelectedBank(value);
    };

    const handleAccountNumberChange = (e) => {
        setAccountNumber(e.target.value);
    };

    const handleCvvChange = (e) => {
        setCvv(e.target.value);
    };

    const handleExpiryDateChange = (date) => {
        setExpiryDate(date);
    };

    // Mảng chứa danh sách ngân hàng
    const vietnameseBanks = [
        "Vietcombank",
        "Techcombank",
        "BIDV",
        "MBBank",
        "VietinBank",
        "Agribank",
        "VPBank",
        "Sacombank",
        "ACB",
        "SeABank",
        "SHB",
        "Eximbank",
        "HDBank",
        "OceanBank",
        "ABBank",
        "GPBank",
        "Nam A Bank",
        "VIB",
        "TPBank",
        "PVcomBank",
    ];

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
                <p className="package-number">
                    Thời hạn: <strong>60</strong> ngày
                </p>
            </div>
            <>
                <button className="package-btn" onClick={handlePackageClick}>
                    CHỌN GÓI
                </button>
                <Modal
                    title="THANH TOÁN"
                    visible={isModalOpen}
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
                            {paymentMethod === "bankCard" && (
                                <>
                                    <Select
                                        placeholder="Chọn ngân hàng"
                                        style={{ width: "100%", marginTop: 10 }}
                                        onChange={handleBankChange}
                                    >
                                        {vietnameseBanks.map((bank, index) => (
                                            <Option key={index} value={bank}>
                                                {bank}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Input
                                        placeholder="Nhập số tài khoản"
                                        style={{ width: "100%", marginTop: 10 }}
                                        onChange={handleAccountNumberChange}
                                    />
                                    <Input
                                        placeholder="Nhập số CVV"
                                        style={{
                                            width: "47.5%",
                                            marginTop: 10,
                                            marginRight: "2.5%",
                                        }}
                                        onChange={handleCvvChange}
                                    />
                                    <DatePicker
                                        placeholder="Ngày hết hạn"
                                        style={{
                                            width: "47.5%",
                                            marginTop: 10,
                                            marginLeft: "2.5%",
                                        }}
                                        picker="day"
                                        format="DD/MM/YYYY"
                                        onChange={handleExpiryDateChange}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </Modal>
            </>
        </div>
    );
};

export default Package;

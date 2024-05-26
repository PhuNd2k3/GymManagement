import React, { useState } from "react";
import FeedbackItem from "../components/FeedbackItem/FeedbackItem";
import { Select } from 'antd'; // Importing Select from antd

const { Option } = Select; // Destructuring Option from Select

const Feedback = () => {
    // Dữ liệu feedback giả
    const fakeFeedbackData = [
        {
            id: 1,
            time: "8:00 Thứ 2, ngày 23 tháng 7",
            type: "Other",
            question: "Tại sao chất lượng dịch vụ thấp thế?",
        },
        {
            id: 2,
            time: "10:30 Thứ 3, ngày 24 tháng 7",
            type: "Staff",
            question: "Nhân viên không thân thiện",
        },
        {
            id: 3,
            time: "10:30 Thứ 3, ngày 24 tháng 7",
            type: "Staff",
            question: "Nhân viên không thân thiện",
        },
        {
            id: 4,
            time: "10:30 Thứ 3, ngày 24 tháng 7",
            type: "Staff",
            question: "Nhân viên không thân thiện",
        },
        {
            id: 5,
            time: "10:30 Thứ 3, ngày 24 tháng 7",
            type: "Staff",
            question:
                "muda muda muda muda muda muda muda muda muda muda muda muda muda muda muda muda muda muda muda muda ",
        },
        // Thêm các phản hồi giả khác ở đây nếu cần
    ];

    // State để lưu trữ nội dung phản hồi mới
    const [newFeedback, setNewFeedback] = useState("");
    const [feedbackType, setFeedbackType] = useState(""); // State to store selected feedback type

    // Hàm xử lý khi người dùng thay đổi nội dung phản hồi mới
    const handleInputChange = (event) => {
        setNewFeedback(event.target.value);
    };

    // Hàm xử lý khi người dùng thay đổi loại phản hồi
    const handleTypeChange = (value) => {
        setFeedbackType(value);
    };

    // Hàm xử lý khi người dùng gửi phản hồi mới
    const handleSubmit = () => {
        // Xử lý logic khi người dùng gửi phản hồi
        console.log("Phản hồi mới:", newFeedback);
        console.log("Loại phản hồi:", feedbackType);
        // Sau khi gửi, có thể thêm logic để xóa nội dung ô text và chọn lại loại phản hồi
        setNewFeedback("");
        setFeedbackType("");
    };

    return (
        <section className="feedback background">
            <div className="container">
                <h1 className="feedback-title">PHẢN HỒI</h1>
                <div className="feedback-container">
                    <div className="feedback-left">
                        <div className="feedback-list">
                            {fakeFeedbackData.map((feedback) => (
                                <FeedbackItem
                                    key={feedback.id}
                                    feedback={feedback}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="feedback-right">
                        <h2>NHẬP PHẢN HỒI MỚI</h2>
                        <div className="feedback-right-inner">
                            <div className="feedback-form">
                                <label htmlFor="feedbackType">
                                    Chọn loại phản hồi:
                                </label>
                                <Select
                                    id="feedbackType"
                                    style={{ width: "50%" }}
                                    value={feedbackType}
                                    onChange={handleTypeChange}
                                    placeholder="Chọn loại phản hồi"
                                >
                                    <Option value="Training room">Training room</Option>
                                    <Option value="Equipment">Equipment</Option>
                                    <Option value="Staff">Staff</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            </div>
                            <textarea
                                value={newFeedback}
                                onChange={handleInputChange}
                                placeholder="Nhập phản hồi của bạn"
                            ></textarea>
                            <button onClick={handleSubmit}>Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;

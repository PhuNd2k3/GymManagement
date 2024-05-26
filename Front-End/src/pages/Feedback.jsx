import React, { useState, useEffect } from "react";
import FeedbackItem from "../components/FeedbackItem/FeedbackItem";
import { Select, message } from 'antd'; // Importing Select and message from antd
import axios from 'axios';

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
    const [feedbackTypes, setFeedbackTypes] = useState([]); // State to store feedback types

    useEffect(() => {
        // Fetch feedback types from API
        const fetchFeedbackTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/feedback_type');
                setFeedbackTypes(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching feedback types:", error);
            }
        };

        fetchFeedbackTypes();
    }, []);

    // Hàm xử lý khi người dùng thay đổi nội dung phản hồi mới
    const handleInputChange = (event) => {
        setNewFeedback(event.target.value);
    };

    // Hàm xử lý khi người dùng thay đổi loại phản hồi
    const handleTypeChange = (value) => {
        setFeedbackType(value);
    };

    // Hàm xử lý khi người dùng gửi phản hồi mới
    const handleSubmit = async () => {
        // Xử lý logic khi người dùng gửi phản hồi
        const selectedType = feedbackTypes.find(type => type.name === feedbackType);
        if (!selectedType) {
            message.error("Vui lòng chọn loại phản hồi hợp lệ.");
            return;
        }

        const newFeedbackData = {
            feedbackTypeId: selectedType.id,
            memberId: 1, // Bạn cần thay thế giá trị này bằng ID thành viên thực tế của người dùng
            feedbackDetail: newFeedback
        };

        try {
            const response = await axios.post('http://localhost:8080/api/feedback/send', newFeedbackData);
            if (response.status === 200) {
                message.success("Gửi phản hồi thành công!");
                // Reset form
                setNewFeedback("");
                setFeedbackType("");
            } else {
                message.error("Không gửi được phản hồi, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Error sending feedback:", error);
            message.error("Không gửi được phản hồi, vui lòng thử lại.");
        }
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
                                    {feedbackTypes.map(type => (
                                        <Option key={type.id} value={type.name}>
                                            {type.name}
                                        </Option>
                                    ))}
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

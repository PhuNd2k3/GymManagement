import React, { useState, useEffect } from "react";
import FeedbackItem from "../components/FeedbackItem/FeedbackItem";
import { Select, message } from 'antd';
import { useParams } from "react-router-dom"; // Import useParams
import axios from 'axios';

const { Option } = Select;

const Feedback = () => {
    const { id } = useParams(); // Get ID from URL
    const [feedbackTypes, setFeedbackTypes] = useState([]);
    const [newFeedback, setNewFeedback] = useState("");
    const [feedbackType, setFeedbackType] = useState("");
    const [userFeedback, setUserFeedback] = useState([]);

    useEffect(() => {
        const fetchFeedbackTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/feedback_type');
                setFeedbackTypes(response.data);
            } catch (error) {
                console.error("Error fetching feedback types:", error);
            }
        };

        const fetchUserFeedback = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/feedback/view/${id}`); // Use ID from URL
                setUserFeedback(response.data);
            } catch (error) {
                console.error("Error fetching user feedback:", error);
            }
        };

        fetchFeedbackTypes();
        fetchUserFeedback();
    }, [id]); // Dependency array includes id to refetch data when id changes

    const handleInputChange = (event) => {
        setNewFeedback(event.target.value);
    };

    const handleTypeChange = (value) => {
        setFeedbackType(value);
    };

    const handleSubmit = async () => {
        const selectedType = feedbackTypes.find(type => type.name === feedbackType);
        if (!selectedType) {
            message.error("Vui lòng chọn loại phản hồi hợp lệ.");
            return;
        }

        const newFeedbackData = {
            feedbackTypeId: selectedType.id,
            memberId: id, // Use ID from URL
            feedbackDetail: newFeedback
        };

        try {
            const response = await axios.post('http://localhost:8080/api/feedback/send', newFeedbackData);
            if (response.status === 200) {
                message.success("Gửi phản hồi thành công!");
                setNewFeedback("");
                setFeedbackType("");
                // Optionally refetch feedback data to show the new feedback
                const response = await axios.get(`http://localhost:8080/api/feedback/view/${id}`);
                setUserFeedback(response.data);
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
                            {userFeedback.map((feedback) => (
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

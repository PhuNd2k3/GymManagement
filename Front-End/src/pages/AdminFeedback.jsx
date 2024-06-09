import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Input, notification, message } from "antd";

const { confirm } = Modal;

const AdminFeedback = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [replyContent, setReplyContent] = useState("");

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/feedback/all");
                setFeedbacks(response.data);
                setFilteredFeedbacks(response.data);
            } catch (error) {
                console.error("Error fetching feedback data:", error);
            }
        };

        fetchFeedbacks();
    }, []);

    useEffect(() => {
        const filtered = feedbacks.filter((feedback) =>
            feedback.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.feedbackDetail.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFeedbacks(filtered);
    }, [searchTerm, feedbacks]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = (id) => {
        confirm({
            title: 'Bạn có muốn xóa phản hồi này không?',
            content: 'Phản hồi sẽ bị xóa vĩnh viễn',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await axios.delete(`http://localhost:8080/api/feedback/delete/${id}`);
                    setFilteredFeedbacks(filteredFeedbacks.filter(feedback => feedback.id !== id));
                    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
                    // notification.success({
                    //     message: 'Success',
                    //     description: 'Phản hồi đã được xóa thành công.',
                    // });
                    message.success("Xóa thành công!");
                } catch (error) {
                    console.error("Error deleting feedback:", error);
                    notification.error({
                        message: 'Error',
                        description: 'Không thể xóa phản hồi. Vui lòng thử lại.',
                    });
                }
            }
        });
    };

    const handleReply = (feedback) => {
        setSelectedFeedback(feedback);
        setReplyContent("");
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (selectedFeedback) {
            try {
                await axios.put("http://localhost:8080/api/feedback/reply", {
                    id: selectedFeedback.id,
                    replyContent: replyContent
                });
                // Update the feedback list with the new reply content
                const updatedFeedbacks = feedbacks.map(fb =>
                    fb.id === selectedFeedback.id ? { ...fb, replyContent } : fb
                );
                setFeedbacks(updatedFeedbacks);
                setFilteredFeedbacks(updatedFeedbacks);
                setIsModalOpen(false);
                setSelectedFeedback(null);
                setReplyContent("");
                // Show success notification
                // notification.success({
                //     message: 'Success',
                //     description: 'Reply sent successfully.',
                // });
                message.success("Đã trả lời!");
            } catch (error) {
                console.error("Error replying to feedback:", error);
                // Show error notification
                notification.error({
                    message: 'Error',
                    description: 'Failed to send reply. Please try again.',
                });
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedFeedback(null);
        setReplyContent("");
    };

    return (
        <div className="admin-feedback background">
            <div className="container">
                <div className="admin-feedback-row">
                    <h1 className="registration-list-title">
                        DANH SÁCH PHẢN HỒI
                    </h1>
                    <div>
                        {/* <button onClick={handleAddNew}>THÊM MỚI</button> */}
                        <div className="group">
                            <svg
                                className="icon"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                            >
                                <g>
                                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                </g>
                            </svg>
                            <input
                                placeholder="Search"
                                type="search"
                                className="input"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
                <div className="admin-feedback-list">
                    {filteredFeedbacks.map((feedback) => (
                        <div className="admin-feedback-item" key={feedback.id}>
                            <div className="admin-feedback-item-left">
                                <img src={feedback.img} alt="" className="admin-feedback-avatar" />
                                <div className="admin-feedback-info">
                                    <p className="admin-feedback-member-name">{feedback.memberName}</p>
                                    <p className="admin-feedback-detail">
                                        {feedback.feedbackDetail}
                                    </p>
                                </div>
                            </div>
                            <div className="admin-feedback-act">
                                <button
                                    className="admin-feedback-btn admin-feedback-delete"
                                    onClick={() => handleDelete(feedback.id)}
                                >
                                    Xóa
                                </button>
                                <button
                                    className="admin-feedback-btn admin-feedback-reply"
                                    onClick={() => handleReply(feedback)}
                                >
                                    Trả lời
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedFeedback && (
                <Modal
                    title="THÔNG TIN PHẢN HỒI"
                    visible={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="GỬI"
                    cancelText="HỦY"
                    className="admin-feedback-modal"
                    width={700}
                >
                    <form className="form">
                        <div className="form-left">
                            <div className="form-group">
                                <label htmlFor="feedbackDetail">
                                    Thông tin phản hồi:&nbsp;
                                </label> <p>{selectedFeedback.feedbackDetail}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="feedbackReply">
                                    Mô tả:
                                </label>
                                <Input.TextArea
                                    id="feedbackReply"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default AdminFeedback;

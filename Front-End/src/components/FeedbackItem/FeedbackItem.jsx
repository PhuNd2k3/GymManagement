import React, { useState } from "react";
import { Modal } from "antd";

const FeedbackItem = ({ feedback }) => {
    const { feedbackTime, feedbackType, feedbackDetail, reply, replyContent } =
        feedback;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`feedback-item ${reply ? "replied" : ""}`}>
            <div className="feedback-info">
                <p className="feedback-time">{feedbackTime}</p>
                <p className="feedback-type">{feedbackType}</p>
                <p className="feedback-question">{feedbackDetail}</p>
            </div>
            <div className="feedback-act">
                {reply ? (
                    <button onClick={showModal} className="view-repplied-btn">
                        Xem trả lời
                    </button>
                ) : (
                    <button onClick={showModal} className="view-repply-btn">
                        Chưa trả lời
                    </button>
                )}
                <Modal
                    title="THÔNG TIN PHẢN HỒI"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <button
                            key="submit"
                            onClick={handleOk}
                            className="feedback-modal-btn"
                        >
                            Thoát
                        </button>,
                    ]}
                    className="feedback-modal"
                    width={600}
                >
                    <div className="feedback-modal-row">
                        <p>Thời gian gửi</p>
                        <span>{feedbackTime}</span>
                    </div>
                    <div className="feedback-modal-row">
                        <p>Loại phản hồi</p>
                        <span>{feedbackType}</span>
                    </div>
                    <div className="feedback-modal-row">
                        <p>Phản hồi</p>
                        <span>{feedbackDetail}</span>
                    </div>
                    <div className="feedback-modal-row feedback-modal-answer">
                        <p>Trả lời</p>
                        {replyContent == null ? (
                            <span>Chưa được trả lời</span>
                        ) : (
                            <span>{replyContent}</span>
                        )}
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default FeedbackItem;

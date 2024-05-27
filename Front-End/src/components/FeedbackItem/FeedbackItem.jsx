import React, { useState } from "react";
import { Modal } from "antd";

const FeedbackItem = ({ feedback }) => {
    const { feedbackTime, feedbackType, feedbackDetail, reply } = feedback;
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
                {reply && <button onClick={showModal}>Xem trả lời</button>}
                <Modal
                    title="THÔNG TIN PHẢN HỒI"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <button key="submit" onClick={handleOk} className="feedback-modal-btn">
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
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sint repellendus, fugiat sapiente deleniti incidunt illum fugit aliquam voluptates inventore sunt esse quo libero eos doloribus quas eligendi, ullam reiciendis? Ducimus sapiente aspernatur nesciunt aperiam harum nam non praesentium? Soluta vel commodi corporis aliquam nisi dicta similique ipsum doloribus facilis?</span>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default FeedbackItem;

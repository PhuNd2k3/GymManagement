import React, { useState } from "react";
import { Modal } from "antd";

const FeedbackItem = ({ feedback }) => {
    const { time, type, question } = feedback;
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
        <div className="feedback-item">
            <div className="feedback-info">
                <p className="feedback-time">{time}</p>
                <p className="feedback-type">{type}</p>
                <p className="feedback-question">{question}</p>
            </div>
            <div className="feedback-act">
                <button onClick={showModal}>Xem trả lời</button>
                <Modal
                    title="THÔNG TIN PHẢN HỒI"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}  // Add this line
                    footer={[
                        <button key="submit" onClick={handleOk} className="feedback-modal-btn">
                            Thoát
                        </button>,
                    ]}
                    className="feedback-modal"
                    width={600}  // Đặt kích thước của modal
                >
                    <div className="feedback-modal-row">
                        <p>Thời gian gửi</p>
                        <span>{time}</span>
                    </div>
                    <div className="feedback-modal-row">
                        <p>Loại phản hồi</p>
                        <span>{type}</span>
                    </div>
                    <div className="feedback-modal-row">
                        <p>Phản hồi</p>
                        <span>{question}</span>
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

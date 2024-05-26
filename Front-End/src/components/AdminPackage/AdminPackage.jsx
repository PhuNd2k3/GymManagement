import React, { useState } from "react";
import axios from 'axios';

const AdminPackage = ({
    id,
    name,
    price,
    numbersOfTrainingPerWeek,
    memberCount,
}) => {
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/membership/delete/${id}`);
            setDeleteSuccess(true);
        } catch (error) {
            console.error("Error deleting package:", error);
            // Handle error
        }
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
                <p className="package-number">
                    Thời hạn: <strong>60</strong> ngày
                </p>
            </div>
            <div className="package-act">
                <button className="package-act-remove" onClick={handleDelete}>
                    XÓA
                </button>
                <button className="package-act-update">SỬA</button>
            </div>
            {deleteSuccess && (
                <div className="notification">Đã xóa thành công gói {name}</div>
            )}
        </div>
    );
};

export default AdminPackage;

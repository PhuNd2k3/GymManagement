import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import login_icon from "../assets/icon/login_icon";

const Profile = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dob: "",
        profilePic: null,
        membershipPeriod: "",
        membershipName: "",
    });
    const [editing, setEditing] = useState(false);
    const [preview, setPreview] = useState(login_icon.form_avatar);

    useEffect(() => {
        // Fetch user data from API
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/profile/${id}`);
                const data = response.data;
                setFormData({
                    fullName: data.fullName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender.toLowerCase(),
                    dob: data.dob.split("T")[0], // Chuyển đổi định dạng ngày
                    profilePic: null,
                    membershipPeriod: data.membershipPeriod.split("T")[0],
                    membershipName: data.membershipName,
                });
                // Nếu có ảnh đại diện, cập nhật preview
                if (data.profilePic) {
                    setPreview(data.profilePic);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            profilePic: file,
        });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setEditing(false);
        // Thêm logic để gửi dữ liệu cập nhật lên API tại đây nếu cần
    };

    return (
        <div className="profile">
            <div className="container">
                <form
                    id="profileForm"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >
                    <div className="form-top">
                        <div className="form-top-left">
                            <h1 className="profile-title">THÔNG TIN CÁ NHÂN</h1>
                            <label htmlFor="fullName">Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                                disabled={!editing}
                            />

                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled={!editing}
                            />

                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                                disabled={!editing}
                            />

                            <label htmlFor="gender">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                                disabled={!editing}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>

                            <label htmlFor="dob">Date of Birth:</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                required
                                disabled={!editing}
                            />

                            <div style={{ display: "flex", gap: "20px" }}>
                                <div>
                                    <label
                                        htmlFor="membershipPeriod"
                                        style={{
                                            display: "inline-block",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        Membership Period:
                                    </label>
                                    <input
                                        type="text"
                                        id="membershipPeriod"
                                        name="membershipPeriod"
                                        value={formData.membershipPeriod}
                                        readOnly
                                        disabled
                                        style={{ width: "100%" }}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="membershipName"
                                        style={{
                                            display: "inline-block",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        Membership Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="membershipName"
                                        name="membershipName"
                                        value={formData.membershipName}
                                        readOnly
                                        disabled
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-top-right">
                            <img src={preview} alt="Profile Preview" />
                            <input
                                type="file"
                                id="profilePic"
                                name="profilePic"
                                onChange={handleFileChange}
                                disabled={!editing}
                            />
                        </div>
                    </div>
                    <div className="form-bottom">
                        {editing ? (
                            <input type="submit" value="Save Changes" />
                        ) : (
                            <button
                                type="button"
                                onClick={() => setEditing(true)}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;

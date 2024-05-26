import React, { useState } from "react";
import login_icon from "../assets/icon/login_icon";

const Profile = () => {
    const [formData, setFormData] = useState({
        fullName: "Nguyễn Đức Phú",
        email: "phund@gmail.com",
        phoneNumber: "1234567890",
        gender: "male",
        dob: "2003-01-01",
        profilePic: null,
    });

    const [editing, setEditing] = useState(false);
    const [preview, setPreview] = useState(login_icon.form_avatar);

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

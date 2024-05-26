-- Dữ liệu cho bảng admin
INSERT INTO admin (phone_number, password) VALUES
('1234567890', 'hashed_password1'),
('0987654321', 'hashed_password2');

-- Dữ liệu cho bảng membership
INSERT INTO membership (name, numbers_of_training_per_week, price, period) VALUES
('Basic Membership', 3, 50, 30),
('Premium Membership', 5, 100, 30),
('Standard Membership', 4, 70, 30),
('Premium Plus Membership', 7, 150, 30),
('Student Membership', 2, 40, 30);

-- Dữ liệu cho bảng member
INSERT INTO member (full_name, address, email, phone_number, password, dob, membership_period, membership_id, gender) VALUES
('John Doe', '123 Main St, City', 'john@example.com', '1234567890', 'password1', '1990-01-01', '2024-05-31', 1, 'Male'),
('Jane Smith', '456 Elm St, Town', 'jane@example.com', '0987654321', 'password2', '1995-05-15', '2024-05-31', 2, 'Female'),
('Alice Johnson', '789 Oak St, Village', 'alice@example.com', '1357924680', 'password3', '1988-12-10', '2024-05-31', 1, 'Female'),
('Bob Brown', '321 Pine St, Hamlet', 'bob@example.com', '9876543210', 'password4', '1998-08-20', '2024-05-31', 2, 'Male'),
('Eve Wilson', '654 Cedar St, Forest', 'eve@example.com', '2468013579', 'password5', '2000-04-25', '2024-05-31', 1, 'Female'),
('Sarah Brown', '567 Pine St, Hamlet', 'sarah@example.com', '1231231234', 'password5', '1993-03-10', '2024-05-31', 2, 'Female'),
('David Jones', '890 Elm St, Town', 'david@example.com', '4564564567', 'password6', '1980-11-25', '2024-05-31', 1, 'Male'),
('Olivia Taylor', '234 Cedar St, Forest', 'olivia@example.com', '7897897890', 'password7', '1998-09-05', '2024-05-31', 3, 'Female'),
('James Wilson', '432 Oak St, Suburb', 'james@example.com', '3213213210', 'password8', '1975-07-18', '2024-05-31', 1, 'Male'),
('Emma Lee', '765 Maple St, Rural', 'emma@example.com', '6546546543', 'password9', '1991-05-30', '2024-05-31', 2, 'Female');

-- Dữ liệu cho bảng sign_up_membership
INSERT INTO sign_up_membership (membership_id, member, status, payment_method) VALUES
(1, 1, 'Accepted', 'Direct'),
(2, 2, 'Accepted', 'Card'),
(1, 3, 'Waiting', 'Direct'),
(2, 4, 'Accepted', 'Card'),
(1, 5, 'Accepted', 'Direct'),
(3, 6, 'Waiting', 'Card'),
(1, 7, 'Accepted', 'Direct'),
(2, 8, 'Waiting', 'Card'),
(3, 9, 'Accepted', 'Direct'),
(1, 10, 'Accepted', 'Card');

-- Dữ liệu cho bảng training_history
INSERT INTO training_history (training_time, member_id) VALUES
('2024-05-25 08:00:00', 1),
('2024-05-26 09:30:00', 2),
('2024-05-25 15:00:00', 3),
('2024-05-26 10:00:00', 4),
('2024-05-25 17:30:00', 5),
('2024-05-27 07:00:00', 6),
('2024-05-28 18:00:00', 7),
('2024-05-29 12:00:00', 8),
('2024-05-30 09:00:00', 9),
('2024-05-31 10:30:00', 10);

-- Dữ liệu cho bảng feedback_type 
INSERT INTO feedback_type (feedback_type_name) VALUES
('Training room'),
('Equipment'),
('Staff'),
('Other');

-- Dữ liệu cho bảng feedback
INSERT INTO feedback (feedback_time, feedback_detail, reply_context, feedback_type_id, member_id, admin_id) VALUES
('2024-05-25 10:00:00', 'The gym was too crowded yesterday.', 'Thank you for your feedback.', 1, 1, 1),
('2024-05-26 11:30:00', 'The equipment needs maintenance.', 'We will look into it immediately.', 2, 2, 2),
('2024-05-25 16:00:00', 'The staff was very helpful.', 'We appreciate your kind words!', 3, 3, 1),
('2024-05-26 12:00:00', 'The cleanliness could be improved.', 'Noted. We apologize for any inconvenience.', 1, 4, 2),
('2024-05-27 09:00:00', 'The music was too loud.', 'We will adjust the volume accordingly.', 2, 5, 1),
('2024-05-28 09:00:00', 'The training room is often too crowded during peak hours.', 'We will look into scheduling adjustments.', 1, 6, 1),
('2024-05-29 10:30:00', 'Some of the equipment needs maintenance.', 'Our maintenance team will address the issue promptly.', 2, 7, 2),
('2024-05-30 11:00:00', 'The staff is always friendly and helpful.', 'Thank you for your kind words!', 3, 8, 1),
('2024-05-31 12:30:00', 'There was a billing discrepancy in my account.', 'We apologize for the inconvenience. Please contact our billing department for assistance.', 4, 9, 2),
('2024-06-01 13:00:00', 'I have a suggestion for adding new equipment.', 'We appreciate your suggestion! We will consider it for future upgrades.', 2, 10, 1);

-- Dữ liệu cho bảng equipment
INSERT INTO equipment (equipment_name, equipment_quantity, receipt_date, equipment_description) VALUES
('Stationary Bike', 8, '2024-05-23', 'New stationary bikes for cardio workouts.'),
('Barbell Set', 15, '2024-05-25', 'Complete barbell sets for strength training.'),
('Swiss Balls', 10, '2024-05-26', 'Swiss balls for stability and core exercises.');

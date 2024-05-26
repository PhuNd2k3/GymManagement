package com.example.gymmanagement.dto.request;

import lombok.Data;

import java.util.Date;

@Data
public class RegisterRequest {
    private String fullName;
    private String address;
    private String email;
    private Date dob;
    private String phoneNumber;
    private String password;
    private String gender;
}

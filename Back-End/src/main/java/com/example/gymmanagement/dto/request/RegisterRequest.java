package com.example.gymmanagement.dto.request;

import lombok.Data;

@Data
public class RegisterRequest {
    private String fullName;
    private String phoneNumber;
    private String password;
    private String gender;
}

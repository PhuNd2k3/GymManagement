package com.example.gymmanagement.dto.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String phone;
    private String password;
}

package com.example.gymmanagement.service;

import com.example.gymmanagement.dto.request.LoginRequest;
import com.example.gymmanagement.dto.response.LoginResponse;

public interface IAdminService {
    LoginResponse isLogin(LoginRequest loginRequest);
}

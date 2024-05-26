package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.dto.request.LoginRequest;
import com.example.gymmanagement.dto.response.LoginResponse;
import com.example.gymmanagement.entity.Admin;
import com.example.gymmanagement.repository.IAdminRepository;
import com.example.gymmanagement.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements IAdminService {
    @Autowired
    private IAdminRepository adminRepository;
    @Override
    public LoginResponse isLogin(LoginRequest loginRequest) {
        LoginResponse result = new LoginResponse();
        Admin admin = adminRepository.findAdminByPhoneNumber(loginRequest.getPhone());
        if(admin == null){
            result.setLogin(false);
            return result;
        }
        if(!admin.getPassword().equals(loginRequest.getPassword())){
            result.setLogin(false);
            return result;
        }
        result.setLogin(true);
        result.setId(admin.getId());
        return result;
    }
}

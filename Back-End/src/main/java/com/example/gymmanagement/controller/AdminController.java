package com.example.gymmanagement.controller;

import com.example.gymmanagement.dto.MemberDTO;
import com.example.gymmanagement.dto.RegisterMembershipDTO;
import com.example.gymmanagement.dto.request.LoginRequest;
import com.example.gymmanagement.dto.request.UpdateRegisterRequest;
import com.example.gymmanagement.dto.response.LoginResponse;
import com.example.gymmanagement.entity.SignUpMembership;
import com.example.gymmanagement.repository.IAdminRepository;
import com.example.gymmanagement.repository.ISignUpMembershipRepository;
import com.example.gymmanagement.service.IAdminService;
import com.example.gymmanagement.service.ISignUpMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {
    @Autowired
    private ISignUpMembershipService signUpMembershipService;
    @Autowired
    private IAdminService adminService;

    @GetMapping(value = "/membership/register_list")
    public List<RegisterMembershipDTO> getAllRegisterMember() {
        List<RegisterMembershipDTO> result = signUpMembershipService.getAll();
        return result;
    }

    @PutMapping(value = "/membership/update_register")
    public ResponseEntity<SignUpMembership> updateRegister(@RequestBody UpdateRegisterRequest request) {
        SignUpMembership updateMembershipRegister = signUpMembershipService.updateMembershipRegister(request);
        return null;
    }
    
    @PostMapping(value = "/admin/login")
    public LoginResponse isLogin(@RequestBody LoginRequest loginRequest) {
        return adminService.isLogin(loginRequest);
    }


//    @GetMapping(value = "/member/all")
//    public List<MemberDTO>
}

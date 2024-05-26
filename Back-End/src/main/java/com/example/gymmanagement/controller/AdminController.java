package com.example.gymmanagement.controller;

import com.example.gymmanagement.dto.MemberDTO;
import com.example.gymmanagement.dto.RegisterMembershipDTO;
import com.example.gymmanagement.dto.request.LoginRequest;
import com.example.gymmanagement.dto.request.MemberAdminRequest;
import com.example.gymmanagement.dto.request.UpdateRegisterRequest;
import com.example.gymmanagement.dto.response.LoginResponse;
import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.SignUpMembership;
import com.example.gymmanagement.repository.IAdminRepository;
import com.example.gymmanagement.repository.ISignUpMembershipRepository;
import com.example.gymmanagement.repository.ITrainingHistoryRepository;
import com.example.gymmanagement.service.IAdminService;
import com.example.gymmanagement.service.IMemberService;
import com.example.gymmanagement.service.ISignUpMembershipService;
import com.example.gymmanagement.service.ITrainingHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @Autowired
    private ITrainingHistoryService trainingHistoryService;
    @Autowired
    private IMemberService memberService;

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

    @PutMapping(value = "/training/add/{id}")
    public ResponseEntity<String> trainingAdd(@PathVariable Integer id){
        try{
            trainingHistoryService.addTraining(id);
            return new ResponseEntity<>("Điểm danh thành công!", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/member/all")
    public List<MemberDTO> getAllMember(){
        return memberService.findAll();
    }

//    @PostMapping(value = "/member/add")
//    public ResponseEntity<String> addMember(@RequestBody MemberAdminRequest request){
//        Member saved = memberService.addMemberOfAdmin(request);
//        if(saved!=null){
//            return new ResponseEntity<>("Thêm thành công member!", HttpStatus.CREATED);
//        }else {
//            return new
//        }
//    }
}

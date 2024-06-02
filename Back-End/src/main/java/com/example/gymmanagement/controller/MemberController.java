package com.example.gymmanagement.controller;

import com.example.gymmanagement.dto.MemberDTO;
import com.example.gymmanagement.dto.request.LoginRequest;
import com.example.gymmanagement.dto.request.MemberRequest;
import com.example.gymmanagement.dto.request.RegisterRequest;
import com.example.gymmanagement.dto.response.LoginResponse;
import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.TrainingHistory;
import com.example.gymmanagement.service.IMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MemberController {
    @Autowired
    private IMemberService memberService;

    @GetMapping(value = "/training/{id}")
    public List<TrainingHistory> getTrainingHistory(@PathVariable Integer id) {
        List<TrainingHistory> trainingHistories = memberService.getTrainingHistory(id);
        return trainingHistories;
    }

    @GetMapping(value = "/profile/{id}")
    public MemberDTO getProfile(@PathVariable Integer id) {
        MemberDTO member = memberService.getMember(id);
        return member;
    }

    @PostMapping(value = "/login")
    public LoginResponse isLogin(@RequestBody LoginRequest loginRequest) {
        return memberService.isLogin(loginRequest);
    }

    @PostMapping(value = "/register")
    public ResponseEntity<Member> addMember(@RequestBody RegisterRequest request) {
        Member savedMember = memberService.addMember(request);
        return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
    }

    @PutMapping(value = "/profile/update")
    public ResponseEntity<String> addMember(@RequestBody MemberRequest request) {
        Member updatedMember = memberService.updateMember(request);
        return new ResponseEntity<>("Update profile successful!", HttpStatus.CREATED);
    }
}

package com.example.gymmanagement.controller;


import com.example.gymmanagement.dto.MemberDTO;
import com.example.gymmanagement.dto.request.LoginRequest;
import com.example.gymmanagement.dto.request.RegisterRequest;
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
    public List<TrainingHistory> getTrainingHistory(@PathVariable Long id){
        List<TrainingHistory> trainingHistories = memberService.getTrainingHistory(id);
        return trainingHistories;
    }

    @GetMapping(value = "/profile/{id}")
    public MemberDTO getProfile(@PathVariable Long id){
        MemberDTO member = memberService.getMember(id);
        return member;
    }

    @GetMapping(value = "/login")
    public boolean isLogin(@RequestBody LoginRequest loginRequest){
        return memberService.isLogin(loginRequest);
    }

    @PostMapping(value = "/register")
    public ResponseEntity<Member> addMember(@RequestBody RegisterRequest request){
        Member savedMember = memberService.addMember(request);
        return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
    }
}

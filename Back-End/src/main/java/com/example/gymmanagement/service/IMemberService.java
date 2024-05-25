package com.example.gymmanagement.service;

import com.example.gymmanagement.dto.MemberDTO;
import com.example.gymmanagement.dto.request.LoginRequest;
import com.example.gymmanagement.dto.request.RegisterRequest;
import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.TrainingHistory;

import java.util.List;

public interface IMemberService {
    List<TrainingHistory> getTrainingHistory(Long id);

    MemberDTO getMember(Long id);

    Boolean isLogin(LoginRequest loginRequest);

    Member addMember(RegisterRequest request);
}

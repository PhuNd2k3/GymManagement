package com.example.gymmanagement.service;

import com.example.gymmanagement.dto.MemberDTO;
import com.example.gymmanagement.dto.request.LoginRequest;
import com.example.gymmanagement.dto.request.RegisterRequest;
import com.example.gymmanagement.dto.response.LoginResponse;
import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.TrainingHistory;

import java.util.List;

public interface IMemberService {
    List<TrainingHistory> getTrainingHistory(Integer id);

    MemberDTO getMember(Integer id);

    LoginResponse isLogin(LoginRequest loginRequest);

    Member addMember(RegisterRequest request);

    boolean deleteMember(Integer id);
}

package com.example.gymmanagement.service;

import com.example.gymmanagement.dto.RegisterMembershipDTO;
import com.example.gymmanagement.dto.request.SignUpMembershipRequest;
import com.example.gymmanagement.dto.request.UpdateRegisterRequest;
import com.example.gymmanagement.dto.response.StatisticsResponse;
import com.example.gymmanagement.entity.SignUpMembership;

import java.util.List;

public interface ISignUpMembershipService {
    SignUpMembership signUpMembership(SignUpMembershipRequest request);

    List<RegisterMembershipDTO> getAll();

    SignUpMembership updateMembershipRegister(UpdateRegisterRequest request);

    StatisticsResponse getSignUpStatistics(Integer type);
}

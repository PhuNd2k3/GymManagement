package com.example.gymmanagement.service;

import com.example.gymmanagement.dto.request.SignUpMembershipRequest;
import com.example.gymmanagement.entity.SignUpMembership;

public interface ISignUpMembershipService {
    SignUpMembership signUpMembership(SignUpMembershipRequest request);
}

package com.example.gymmanagement.controller;

import com.example.gymmanagement.dto.request.SignUpMembershipRequest;
import com.example.gymmanagement.entity.SignUpMembership;
import com.example.gymmanagement.service.ISignUpMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignUpMembershipController {
    @Autowired
    private ISignUpMembershipService signUpMembershipService;
    @PostMapping(value = "/membership/register")
    public ResponseEntity<SignUpMembership> addMember(@RequestBody SignUpMembershipRequest request) {
        SignUpMembership savedSignUpMembership = signUpMembershipService.signUpMembership(request);
        return new ResponseEntity<>(savedSignUpMembership, HttpStatus.CREATED);
    }
}

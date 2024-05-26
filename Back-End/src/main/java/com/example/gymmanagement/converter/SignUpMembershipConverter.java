package com.example.gymmanagement.converter;

import com.example.gymmanagement.dto.RegisterMembershipDTO;
import com.example.gymmanagement.entity.SignUpMembership;
import org.springframework.stereotype.Component;

@Component
public class SignUpMembershipConverter {
    public RegisterMembershipDTO toRegisterMembershipDTO(SignUpMembership signUpMembership){
        RegisterMembershipDTO result = new RegisterMembershipDTO();
        result.setId(signUpMembership.getId());
        result.setCurrentMembership(signUpMembership.getMember().getMembership().getName());
        result.setDob(signUpMembership.getMember().getDob());
        result.setFullName(signUpMembership.getMember().getFullName());
        result.setPhoneNumber(signUpMembership.getMember().getPhoneNumber());
        result.setRegisterMembership(signUpMembership.getMembership().getName());
        result.setRegisterMembershipId(signUpMembership.getMembership().getId());
        return result;
    }
}

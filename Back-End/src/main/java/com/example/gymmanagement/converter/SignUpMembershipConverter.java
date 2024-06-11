package com.example.gymmanagement.converter;

import com.example.gymmanagement.dto.RegisterMembershipDTO;
import com.example.gymmanagement.entity.SignUpMembership;
import org.springframework.stereotype.Component;

@Component
public class SignUpMembershipConverter {

    public RegisterMembershipDTO toRegisterMembershipDTO(SignUpMembership signUpMembership) {
        RegisterMembershipDTO result = new RegisterMembershipDTO();
        result.setId(signUpMembership.getId());

        // Kiểm tra nếu member hoặc membership của member là null
        if (signUpMembership.getMember() != null && signUpMembership.getMember().getMembership() != null) {
            result.setCurrentMembership(signUpMembership.getMember().getMembership().getName());
        } else {
            result.setCurrentMembership(null);
        }

        if (signUpMembership.getMember() != null) {
            result.setDob(signUpMembership.getMember().getDob());
            result.setFullName(signUpMembership.getMember().getFullName());
            result.setPhoneNumber(signUpMembership.getMember().getPhoneNumber());
        }

        if (signUpMembership.getMembership() != null) {
            result.setRegisterMembership(signUpMembership.getMembership().getName());
            result.setRegisterMembershipId(signUpMembership.getMembership().getId());
        }

        if (signUpMembership.getMember() != null) {
            result.setMemberId(signUpMembership.getMember().getId());
        }

        result.setPaymentMethod(signUpMembership.getPaymentMethod());
        return result;
    }
}

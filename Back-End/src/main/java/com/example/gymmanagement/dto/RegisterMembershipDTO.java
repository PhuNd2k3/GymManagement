package com.example.gymmanagement.dto;

import lombok.Data;

import java.util.Date;

@Data
public class RegisterMembershipDTO {
    private Integer id;
    private String currentMembership;
    private String registerMembership;
    private Integer registerMembershipId;
    private String fullName;
    private String phoneNumber;
    private Date dob;
    private Integer memberId;
    private String paymentMethod;
}

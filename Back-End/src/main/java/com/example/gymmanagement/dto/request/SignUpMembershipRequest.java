package com.example.gymmanagement.dto.request;

import lombok.Data;

@Data
public class SignUpMembershipRequest {
    private Integer memberId;
    private Integer membershipId;
    private String paymentMethod;
}

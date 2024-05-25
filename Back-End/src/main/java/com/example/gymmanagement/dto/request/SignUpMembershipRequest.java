package com.example.gymmanagement.dto.request;

import lombok.Data;

@Data
public class SignUpMembershipRequest {
    private Long memberId;
    private Long membershipId;
    private String payment_method;
}

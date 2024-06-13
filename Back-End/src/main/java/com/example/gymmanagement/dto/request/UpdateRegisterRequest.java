package com.example.gymmanagement.dto.request;

import lombok.Data;

@Data
public class UpdateRegisterRequest {
    private Integer id;
    private Integer memberId;
    private Integer membershipId;
    private String status;
    private String paymentMethod;
}

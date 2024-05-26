package com.example.gymmanagement.dto.request;

import lombok.Data;

import java.util.Date;

@Data
public class MemberAdminRequest {
    private Integer id;
    private String fullName;
    private String email;
    private String gender;
    private Date dob;
    private String phoneNumber;
    private Integer membershipId;
}

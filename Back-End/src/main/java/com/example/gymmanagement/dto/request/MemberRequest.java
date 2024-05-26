package com.example.gymmanagement.dto.request;

import lombok.Data;

import java.util.Date;
@Data
public class MemberRequest {
    private Integer id;
    private String fullName;
    private String phoneNumber;
    private String gender;
    private Date dob;
    private String email;
}

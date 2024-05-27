package com.example.gymmanagement.dto;

import lombok.Data;

import java.util.Date;

@Data
public class MemberDTO {
    private Integer id;
    private String fullName;
    private String address;
    private String email;
    private String phoneNumber;
    private String password;
    private String gender;
    private Date dob;
    private Date membershipPeriod;
    private String membershipName;
    private boolean isTrainingToday;
}

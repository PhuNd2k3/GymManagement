package com.example.gymmanagement.dto;

import lombok.Data;

@Data
public class MembershipDTO {
    private String name;
    private Integer price;
    private Long memberCount;
    private Integer numbersOfTrainingPerWeek;
}

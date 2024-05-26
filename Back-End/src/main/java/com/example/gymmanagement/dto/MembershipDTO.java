package com.example.gymmanagement.dto;

import lombok.Data;

@Data
public class MembershipDTO {
    private Integer id;
    private String name;
    private Integer price;
    private Integer memberCount;
    private Integer numbersOfTrainingPerWeek;
    private Integer period;
    private Integer numbersOfTrainingWeek;
}

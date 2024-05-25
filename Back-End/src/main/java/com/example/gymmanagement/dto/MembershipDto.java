package com.example.gymmanagement.dto;

import lombok.Data;

@Data
public class MembershipDto {
    private String name;
    private Integer price;
    private Long memberCount;
    private Integer numbersOfTrainingPerWeek;
}

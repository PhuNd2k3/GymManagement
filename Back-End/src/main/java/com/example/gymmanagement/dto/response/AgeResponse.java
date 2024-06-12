package com.example.gymmanagement.dto.response;

import lombok.Data;

@Data
public class AgeResponse {
    private Integer ageFrom17To25 = 0;
    private Integer ageFrom25To35 = 0;
    private Integer ageOver35 = 0;
    private Integer total;
}

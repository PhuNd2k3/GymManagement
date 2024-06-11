package com.example.gymmanagement.dto.response;

import lombok.Data;

@Data
public class StatisticsResponse {
    private Integer count;
    private Integer last;
    private Integer now;
}

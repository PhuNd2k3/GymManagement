package com.example.gymmanagement.handlers;

import com.example.gymmanagement.dto.response.StatisticsResponse;

public interface StatisticsHandler {
    StatisticsResponse handle(Integer type);
}

package com.example.gymmanagement.service;

import com.example.gymmanagement.dto.response.StatisticsResponse;

public interface ITrainingHistoryService {
    void addTraining(Integer id);
    StatisticsResponse getTrainingStatistics(Integer type);
}

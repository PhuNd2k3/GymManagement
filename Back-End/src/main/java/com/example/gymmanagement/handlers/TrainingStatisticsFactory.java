package com.example.gymmanagement.handlers;

public interface TrainingStatisticsFactory {
    TrainingStatisticsHandler getTrainingStatistics(Integer type);
    void registerTrainingStatisticsHandler(Integer type, TrainingStatisticsHandler strategy);
}

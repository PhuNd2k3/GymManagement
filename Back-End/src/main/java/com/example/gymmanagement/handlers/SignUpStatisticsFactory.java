package com.example.gymmanagement.handlers;

public interface SignUpStatisticsFactory {
    SignUpStatisticsHandler getSignUpStatistics(Integer type);
    void registerSignUpStatisticsHandler(Integer type, SignUpStatisticsHandler strategy);
}

package com.example.gymmanagement.handlers.Impl;

import com.example.gymmanagement.dto.response.StatisticsResponse;
import com.example.gymmanagement.handlers.TrainingStatisticsHandler;
import com.example.gymmanagement.repository.ITrainingHistoryRepository;
import com.example.gymmanagement.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TrainingYearHandler implements TrainingStatisticsHandler {
    @Autowired
    private ITrainingHistoryRepository trainingHistoryRepository;

    @Override
    public StatisticsResponse handle() {
        StatisticsResponse result = new StatisticsResponse();
        Date currentDate = new Date();
        Date startOfYear = DateUtils.getStartOfYear();
        Date startOfLastYear = DateUtils.getStartOfLastYear();
        result.setCount(trainingHistoryRepository.findAll().size());
        result.setNow(trainingHistoryRepository.findByTrainingTimeBetween(startOfYear,currentDate).size());
        result.setLast(trainingHistoryRepository.findByTrainingTimeBetweenBefore(startOfLastYear,startOfYear).size());
        return result;
    }
}

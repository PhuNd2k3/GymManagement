package com.example.gymmanagement.handlers.Impl;

import com.example.gymmanagement.dto.response.StatisticsResponse;
import com.example.gymmanagement.handlers.TrainingStatisticsHandler;
import com.example.gymmanagement.repository.ITrainingHistoryRepository;
import com.example.gymmanagement.service.ITrainingHistoryService;
import com.example.gymmanagement.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TrainingWeekHandler implements TrainingStatisticsHandler {
    @Autowired
    private ITrainingHistoryRepository trainingHistoryRepository;

    @Override
    public StatisticsResponse handle() {
        StatisticsResponse result = new StatisticsResponse();
        Date currentDate = new Date();
        Date startOfWeek = DateUtils.getStartOfWeek();
        Date startOfLastWeek = DateUtils.getStartOfLastWeek();
        result.setCount(trainingHistoryRepository.findAll().size());
        result.setNow(trainingHistoryRepository.findByTrainingTimeBetween(startOfWeek,currentDate).size());
        result.setLast(trainingHistoryRepository.findByTrainingTimeBetweenBefore(startOfLastWeek,startOfWeek).size());
        return result;
    }
}

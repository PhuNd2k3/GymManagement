package com.example.gymmanagement.handlers.factory;

import com.example.gymmanagement.handlers.Impl.TrainingMonthHandler;
import com.example.gymmanagement.handlers.Impl.TrainingWeekHandler;
import com.example.gymmanagement.handlers.Impl.TrainingYearHandler;
import com.example.gymmanagement.handlers.SignUpStatisticsHandler;
import com.example.gymmanagement.handlers.TrainingStatisticsFactory;
import com.example.gymmanagement.handlers.TrainingStatisticsHandler;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class TrainingStatisticsFactoryImpl implements TrainingStatisticsFactory {
    private Map<Integer, TrainingStatisticsHandler> strategies = new HashMap<>();

    public TrainingStatisticsFactoryImpl(TrainingWeekHandler week, TrainingMonthHandler month, TrainingYearHandler year){
        strategies.put(1,week);
        strategies.put(2,month);
        strategies.put(3,year);
    }
    @Override
    public TrainingStatisticsHandler getTrainingStatistics(Integer type) {
        TrainingStatisticsHandler strategy = strategies.get(type);
        if (strategy == null) {
            throw new IllegalArgumentException("Invalid type");
        }
        return strategy;
    }

    @Override
    public void registerTrainingStatisticsHandler(Integer type, TrainingStatisticsHandler strategy) {
        strategies.put(type, strategy);
    }
}

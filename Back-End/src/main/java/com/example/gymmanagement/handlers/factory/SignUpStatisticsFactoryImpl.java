package com.example.gymmanagement.handlers.factory;

import com.example.gymmanagement.handlers.Impl.SignUpMonthHandler;
import com.example.gymmanagement.handlers.Impl.SignUpWeekHandler;
import com.example.gymmanagement.handlers.Impl.SignUpYearHandler;
import com.example.gymmanagement.handlers.SignUpStatisticsFactory;
import com.example.gymmanagement.handlers.SignUpStatisticsHandler;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class SignUpStatisticsFactoryImpl implements SignUpStatisticsFactory {
    private Map<Integer, SignUpStatisticsHandler> strategies = new HashMap<>();

    public SignUpStatisticsFactoryImpl(SignUpWeekHandler signUpWeekHandler, SignUpMonthHandler signUpMonthHandler, SignUpYearHandler signUpYearHandler) {
        strategies.put(1, signUpWeekHandler);
        strategies.put(2, signUpMonthHandler);
        strategies.put(3, signUpYearHandler);
    }

    @Override
    public SignUpStatisticsHandler getSignUpStatistics(Integer type) {
        SignUpStatisticsHandler strategy = strategies.get(type);
        if (strategy == null) {
            throw new IllegalArgumentException("Invalid type");
        }
        return strategy;
    }

    public void registerSignUpStatisticsHandler(Integer type, SignUpStatisticsHandler strategy) {
        strategies.put(type, strategy);
    }
}

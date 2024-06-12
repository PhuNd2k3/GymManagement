package com.example.gymmanagement.handlers.factory;

import com.example.gymmanagement.handlers.Impl.*;
import com.example.gymmanagement.handlers.SaleStatisticsFactory;
import com.example.gymmanagement.handlers.SaleStatisticsHandler;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class SaleStatisticsFactoryImpl implements SaleStatisticsFactory {
    private Map<Integer, SaleStatisticsHandler> strategies = new HashMap<>();

    public SaleStatisticsFactoryImpl(SaleWeekHandler saleWeekHandler, SaleMonthHandler saleMonthHandler, SaleYearHandler saleYearHandler) {
        strategies.put(1, saleWeekHandler);
        strategies.put(2, saleMonthHandler);
        strategies.put(3, saleYearHandler);
    }
    @Override
    public SaleStatisticsHandler getSaleStatistics(Integer type) {
        SaleStatisticsHandler strategy = strategies.get(type);
        if (strategy == null) {
            throw new IllegalArgumentException("Invalid type");
        }
        return strategy;
    }

    @Override
    public void registerSaleStatisticsHandler(Integer type, SaleStatisticsHandler strategy) {
        strategies.put(type, strategy);
    }
}

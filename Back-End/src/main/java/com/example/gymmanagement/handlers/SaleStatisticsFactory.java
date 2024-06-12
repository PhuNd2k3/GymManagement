package com.example.gymmanagement.handlers;

public interface SaleStatisticsFactory {
    SaleStatisticsHandler getSaleStatistics(Integer type);
    void registerSaleStatisticsHandler(Integer type, SaleStatisticsHandler strategy);
}

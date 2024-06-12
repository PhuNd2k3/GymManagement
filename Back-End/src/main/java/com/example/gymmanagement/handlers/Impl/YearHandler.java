package com.example.gymmanagement.handlers.Impl;

import com.example.gymmanagement.dto.response.StatisticsResponse;
import com.example.gymmanagement.handlers.StatisticsHandler;
import com.example.gymmanagement.repository.IMemberRepository;
import com.example.gymmanagement.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class YearHandler implements StatisticsHandler {
    @Autowired
    private IMemberRepository memberRepository;

    @Override
    public StatisticsResponse handle(Integer type) {
        Date currentDate = new Date();
        Date startOfYear = DateUtils.getStartOfYear();
        Date startOfLastYear = DateUtils.getStartOfLastYear();
        StatisticsResponse response = new StatisticsResponse();
        response.setCount(memberRepository.findAll().size());
        response.setNow(memberRepository.findByRegisterDateBetween(startOfYear, currentDate).size());
        response.setLast(memberRepository.findByRegisterDateBetweenBefore(startOfLastYear, startOfYear).size());
        return response;
    }
}

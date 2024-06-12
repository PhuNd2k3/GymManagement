package com.example.gymmanagement.handlers.Impl;

import com.example.gymmanagement.dto.response.StatisticsResponse;
import com.example.gymmanagement.handlers.StatisticsHandler;
import com.example.gymmanagement.repository.IMemberRepository;
import com.example.gymmanagement.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.util.Date;

@Component
public class WeekHandler implements StatisticsHandler {
    @Autowired
    private IMemberRepository memberRepository;
    @Override
    public StatisticsResponse handle(Integer type) {
        Date currentDate = new Date();
        StatisticsResponse response = new StatisticsResponse();
        Date startOfWeek = DateUtils.getStartOfWeek();
        Date startOfLastWeek = DateUtils.getStartOfLastWeek();
        response.setCount(memberRepository.findAll().size());
        response.setNow(memberRepository.findByRegisterDateBetween(startOfWeek,currentDate).size());
        response.setLast(memberRepository.findByRegisterDateBetweenBefore(startOfLastWeek,startOfWeek).size());
        return response;
    }
}

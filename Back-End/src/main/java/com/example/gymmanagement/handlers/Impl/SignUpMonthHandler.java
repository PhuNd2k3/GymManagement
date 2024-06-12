package com.example.gymmanagement.handlers.Impl;

import com.example.gymmanagement.dto.response.StatisticsResponse;
import com.example.gymmanagement.handlers.SignUpStatisticsHandler;
import com.example.gymmanagement.repository.ISignUpMembershipRepository;
import com.example.gymmanagement.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class SignUpMonthHandler implements SignUpStatisticsHandler {
    @Autowired
    private ISignUpMembershipRepository signUpMembershipRepository;
    @Override
    public StatisticsResponse handle() {
        Date currentDate = new Date();
        Date startOfMonth = DateUtils.getStartOfMonth();
        Date startOfLastMonth = DateUtils.getStartOfLastMonth();
        StatisticsResponse result = new StatisticsResponse();
        result.setCount(signUpMembershipRepository.findByStatus("Accepted").size());
        result.setNow(signUpMembershipRepository.findBySignUpDateBetween(startOfMonth,currentDate,"Accepted").size());
        result.setLast(signUpMembershipRepository.findBySignUpDateBetweenBefore(startOfLastMonth,startOfMonth,"Accepted").size());
        return result;
    }
}

package com.example.gymmanagement.handlers.Impl;

import com.example.gymmanagement.dto.response.StatisticsResponse;
import com.example.gymmanagement.handlers.StatisticsHandler;
import com.example.gymmanagement.repository.IMemberRepository;
import com.example.gymmanagement.utils.ResetTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@Component
public class MonthHandler implements StatisticsHandler {
    @Autowired
    private IMemberRepository memberRepository;

    @Override
    public StatisticsResponse handle(Integer type) {
        Date currentDate = new Date();

        // Khởi tạo một đối tượng Calendar và thiết lập ngày hiện tại
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);

        // Thiết lập ngày đầu của tháng
        calendar.set(Calendar.DAY_OF_MONTH, 1);

        // Lấy ngày đầu của tháng
        Date startOfMonth = calendar.getTime();

        // Trừ đi một tháng từ ngày hiện tại
        calendar.add(Calendar.MONTH, -1);

        // Thiết lập ngày đầu của tháng trước đó
        calendar.set(Calendar.DAY_OF_MONTH, 1);

        Date startOfLastMonth = calendar.getTime();

        StatisticsResponse response = new StatisticsResponse();
        response.setCount(memberRepository.findAll().size());
        response.setNow(memberRepository.findByRegisterDateBetween(ResetTime.reset(startOfMonth), currentDate).size());
        response.setLast(memberRepository.findByRegisterDateBetweenBefore(ResetTime.reset(startOfLastMonth), ResetTime.reset(startOfMonth)).size());
        return response;
    }
}

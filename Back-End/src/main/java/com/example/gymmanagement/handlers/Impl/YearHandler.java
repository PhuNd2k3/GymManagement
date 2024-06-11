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
public class YearHandler implements StatisticsHandler {
    @Autowired
    private IMemberRepository memberRepository;

    @Override
    public StatisticsResponse handle(Integer type) {
        Date currentDate = new Date();

        // Khởi tạo một đối tượng Calendar và thiết lập ngày hiện tại
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);

        // Thiết lập ngày đầu của năm
        calendar.set(Calendar.DAY_OF_YEAR, 1);

        // Lấy ngày đầu của năm
        Date startOfYear = calendar.getTime();

        // Trừ đi 1 năm từ ngày hiện tại
        calendar.add(Calendar.YEAR, -1);

        // Thiết lập ngày đầu của năm trước đó
        calendar.set(Calendar.DAY_OF_YEAR, 1);

        Date startOfLastYear = calendar.getTime();

        StatisticsResponse response = new StatisticsResponse();
        response.setCount(memberRepository.findAll().size());
        response.setNow(memberRepository.findByRegisterDateBetween(ResetTime.reset(startOfYear), currentDate).size());
        response.setLast(memberRepository.findByRegisterDateBetweenBefore(ResetTime.reset(startOfLastYear), ResetTime.reset(startOfYear)).size());
        return response;
    }
}

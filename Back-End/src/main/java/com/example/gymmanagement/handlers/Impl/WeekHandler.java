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
public class WeekHandler implements StatisticsHandler {
    @Autowired
    private IMemberRepository memberRepository;
    @Override
    public StatisticsResponse handle(Integer type) {
        Date currentDate = new Date();

        // Khởi tạo một đối tượng Calendar và thiết lập ngày hiện tại
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);

        // Thiết lập ngày đầu của tuần bằng cách đặt thứ hai là ngày đầu tiên của tuần
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);

        // Lấy ngày đầu của tuần
        Date startOfWeek = calendar.getTime();

        calendar.add(Calendar.DAY_OF_YEAR, -7);
        Date endOfLastWeek = calendar.getTime();

        StatisticsResponse response = new StatisticsResponse();
        response.setCount(memberRepository.findAll().size());
        response.setNow(memberRepository.findByRegisterDateBetween(ResetTime.reset(startOfWeek),currentDate).size());
        response.setLast(memberRepository.findByRegisterDateBetweenBefore(ResetTime.reset(endOfLastWeek),ResetTime.reset(startOfWeek)).size());
        return response;
    }
}

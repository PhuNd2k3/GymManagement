package com.example.gymmanagement.utils;

import java.util.Calendar;
import java.util.Date;

public class ResetTime {
    public static Date reset(Date date) {
        // Tạo một đối tượng Calendar và thiết lập ngày và giờ của date
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        // Đặt giờ, phút và giây thành 0
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        // Lấy lại đối tượng Date đã được reset
        return calendar.getTime();
    }

}

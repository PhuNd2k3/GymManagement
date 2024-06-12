package com.example.gymmanagement.utils;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;

public class DateUtils {
    private static Date convertToDate(LocalDate localDate) {
        return ResetTime.reset(Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant()));
    }

    // Lấy ngày đầu của tuần trước
    public static Date getStartOfLastWeek() {
        LocalDate today = LocalDate.now();
        LocalDate startOfThisWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate startOfLastWeek = startOfThisWeek.minusWeeks(1);
        return convertToDate(startOfLastWeek);
    }

    // Lấy ngày đầu của tháng trước
    public static Date getStartOfLastMonth() {
        LocalDate today = LocalDate.now();
        LocalDate startOfThisMonth = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate startOfLastMonth = startOfThisMonth.minusMonths(1);
        return convertToDate(startOfLastMonth);
    }

    // Lấy ngày đầu của năm trước
    public static Date getStartOfLastYear() {
        LocalDate today = LocalDate.now();
        LocalDate startOfThisYear = today.with(TemporalAdjusters.firstDayOfYear());
        LocalDate startOfLastYear = startOfThisYear.minusYears(1);
        return convertToDate(startOfLastYear);
    }

    public static Date getStartOfWeek() {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        return convertToDate(startOfWeek);
    }

    // Lấy ngày bắt đầu của tháng hiện tại
    public static Date getStartOfMonth() {
        LocalDate today = LocalDate.now();
        LocalDate startOfMonth = today.with(TemporalAdjusters.firstDayOfMonth());
        return convertToDate(startOfMonth);
    }

    // Lấy ngày bắt đầu của năm hiện tại
    public static Date getStartOfYear() {
        LocalDate today = LocalDate.now();
        LocalDate startOfYear = today.with(TemporalAdjusters.firstDayOfYear());
        return convertToDate(startOfYear);
    }
}

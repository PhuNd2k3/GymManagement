package com.example.gymmanagement.utils;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.Calendar;
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

    public static Date getStartOfWeek(int weeksAgo) {
        LocalDate now = LocalDate.now();
        LocalDate startOfWeek = now.with(java.time.DayOfWeek.MONDAY).minusWeeks(weeksAgo);

        return convertToDate(startOfWeek);
    }

    public static Date getStartOfMonth(int monthsAgo) {
        LocalDate now = LocalDate.now();
        LocalDate startOfMonth = now.minusMonths(monthsAgo).withDayOfMonth(1);
        return convertToDate(startOfMonth);
    }

    public static Date getStartOfYear(int year) {
        LocalDate startOfYear = LocalDate.of(year, 1, 1); // Start from January 1st of the specified year
        return convertToDate(startOfYear);
    }
    public static int getWeekOfYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.WEEK_OF_YEAR);
    }

    public static int getMonthOfYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.MONTH) + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    }

    public static int getYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.YEAR);
    }
}

package com.example.gymmanagement.handlers.Impl;

import com.example.gymmanagement.dto.response.SaleResponse;
import com.example.gymmanagement.entity.SignUpMembership;
import com.example.gymmanagement.handlers.SaleStatisticsHandler;
import com.example.gymmanagement.repository.ISignUpMembershipRepository;
import com.example.gymmanagement.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class SaleYearHandler implements SaleStatisticsHandler {
    @Autowired
    private ISignUpMembershipRepository signUpMembershipRepository;

    @Override
    public SaleResponse handle() {
        SaleResponse result = new SaleResponse();

        int currentYear = DateUtils.getYear(new Date()); // Lấy năm hiện tại
        int startYear = currentYear - 1; // Bắt đầu từ năm trước đó

        for (int i = 0; i < 2; i++) { // Lặp qua hai năm trước đó
            int year = startYear + i;
            Date startOfYear = DateUtils.getStartOfYear(year);
            Date startOfNextYear = DateUtils.getStartOfYear(year + 1);

            List<SignUpMembership> signUpMemberships = signUpMembershipRepository.findBySignUpDateBetweenBefore(startOfYear, startOfNextYear, "Accepted");
            int sale = 0;
            for (SignUpMembership membership : signUpMemberships) {
                sale += membership.getMembership().getPrice();
            }

            // Thêm dữ liệu doanh thu vào đối tượng phản hồi
            result.getSales().put("Y" + year, sale);
        }

        return result;
    }
}

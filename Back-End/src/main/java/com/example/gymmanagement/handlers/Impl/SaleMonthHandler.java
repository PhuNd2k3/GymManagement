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
public class SaleMonthHandler implements SaleStatisticsHandler {
    @Autowired
    private ISignUpMembershipRepository signUpMembershipRepository;

    @Override
    public SaleResponse handle() {
        SaleResponse result = new SaleResponse();

        for (int i = 4; i >= 0; i--) { // Loop through the last 6 months
            Date startOfMonth = DateUtils.getStartOfMonth(i);
            Date startOMonthNext;
            if(i==0){
                startOMonthNext = new Date();
            }else{
                startOMonthNext = DateUtils.getStartOfMonth(i - 1);
            }
            List<SignUpMembership> signUpMemberships = signUpMembershipRepository.findBySignUpDateBetweenBefore(startOfMonth, startOMonthNext, "Accepted");
            int sale = 0;
            for (SignUpMembership membership : signUpMemberships) {
                sale += membership.getMembership().getPrice();
            }

            // Add the sales data to the response object
            result.getSales().put("T" + DateUtils.getMonthOfYear(startOfMonth) + "/" + DateUtils.getYear(startOfMonth), sale);
        }

        return result;
    }
}

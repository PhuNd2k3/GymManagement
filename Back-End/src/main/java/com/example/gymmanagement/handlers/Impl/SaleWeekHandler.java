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
public class SaleWeekHandler implements SaleStatisticsHandler {
    @Autowired
    private ISignUpMembershipRepository signUpMembershipRepository;
    @Override
    public SaleResponse handle() {
        SaleResponse result = new SaleResponse();
        for(int i = 6 ; i >= 0 ; i--){
            Date startOfWeek = DateUtils.getStartOfWeek(i);
            Date startOfWeekNext;
            if(i==0){
                startOfWeekNext = new Date();
            }else{
                startOfWeekNext = DateUtils.getStartOfWeek(i-1);
            }

            List<SignUpMembership> signUpMemberships = signUpMembershipRepository.findBySignUpDateBetweenBefore(startOfWeek,startOfWeekNext,"Accepted");
            Integer sale = 0;
            for(SignUpMembership it : signUpMemberships){
                sale += it.getMembership().getPrice();
            }
            result.getSales().put("W"+DateUtils.getWeekOfYear(startOfWeek) +"/"+ DateUtils.getYear(startOfWeek),sale);
        }
        return result;
    }
}

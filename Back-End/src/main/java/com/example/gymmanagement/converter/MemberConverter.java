package com.example.gymmanagement.converter;

import com.example.gymmanagement.dto.MemberDTO;
import com.example.gymmanagement.dto.request.RegisterRequest;
import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.TrainingHistory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@Component
public class MemberConverter {
    @Autowired
    private ModelMapper modelMapper;


    public MemberDTO toMemberDTO(Member member) {
        if (member == null) {
            return null;
        }

        MemberDTO result = modelMapper.map(member, MemberDTO.class);

        if (member.getMembership() != null) {
            result.setMembershipName(member.getMembership().getName());
        } else {
            result.setMembershipName(null);
        }
        result.setTrainingToday(false);
        for(TrainingHistory it : member.getTrainingHistories()){
            if(resetTime(it.getTrainingTime()).equals(resetTime(new Date()))){
                result.setTrainingToday(true);
                break;
            }
        }
        return result;
    }


    public Member toMember(RegisterRequest request){
        Member result = modelMapper.map(request,Member.class);
        return result;
    }

    private Date resetTime(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }
}

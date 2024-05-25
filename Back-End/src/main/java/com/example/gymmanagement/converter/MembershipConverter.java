package com.example.gymmanagement.converter;


import com.example.gymmanagement.dto.MembershipDTO;
import com.example.gymmanagement.entity.Membership;
import org.springframework.stereotype.Component;

@Component
public class MembershipConverter {
    public MembershipDTO toMembershipDTO(Membership membership){
        MembershipDTO membershipDTO = new MembershipDTO();
        membershipDTO.setName(membership.getName());
        membershipDTO.setPrice(membership.getPrice());
        membershipDTO.setMemberCount(membership.getMembers().size());
        membershipDTO.setNumbersOfTrainingPerWeek(membership.getNumberOfTrainingPerWeek());
        return membershipDTO;
    }
}

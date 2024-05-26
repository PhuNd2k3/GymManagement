package com.example.gymmanagement.converter;


import com.example.gymmanagement.dto.MembershipDTO;
import com.example.gymmanagement.entity.Membership;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MembershipConverter {
    @Autowired
    private ModelMapper modelMapper;
    public MembershipDTO toMembershipDTO(Membership membership){
        MembershipDTO membershipDTO = modelMapper.map(membership,MembershipDTO.class);
        membershipDTO.setMemberCount(membership.getMembers().size());
        return membershipDTO;
    }

    public Membership toMembership(MembershipDTO membershipDTO){
        Membership membership = modelMapper.map(membershipDTO,Membership.class);
        return membership;
    }
}

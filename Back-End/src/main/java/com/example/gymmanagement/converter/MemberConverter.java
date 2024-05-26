package com.example.gymmanagement.converter;

import com.example.gymmanagement.dto.MemberDTO;
import com.example.gymmanagement.dto.request.RegisterRequest;
import com.example.gymmanagement.entity.Member;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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

        return result;
    }


    public Member toMember(RegisterRequest request){
        Member result = modelMapper.map(request,Member.class);
        return result;
    }
}

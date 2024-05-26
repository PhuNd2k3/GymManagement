package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.converter.MembershipConverter;
import com.example.gymmanagement.dto.MembershipDTO;
import com.example.gymmanagement.entity.Membership;
import com.example.gymmanagement.repository.IMembershipRepository;
import com.example.gymmanagement.repository.ISignUpMembershipRepository;
import com.example.gymmanagement.service.IMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MembershipServiceImpl implements IMembershipService {
    @Autowired
    private IMembershipRepository membershipRepository;

    @Autowired
    private MembershipConverter membershipConverter;

    @Autowired
    private ISignUpMembershipRepository signUpMembershipRepository;

    @Override
    public MembershipDTO getMembershipDetail(Integer id) {
        Membership membership = membershipRepository.findById(id).get();
        int count = membership.getMembers().size();
        System.out.println(count);
        return null;
    }

    @Override
    public List<MembershipDTO> findAll() {
        List<Membership> membership = membershipRepository.findAll();
        List<MembershipDTO> result = new ArrayList<>();
        for (Membership it : membership) {
            result.add(membershipConverter.toMembershipDTO(it));
        }
        return result;
    }

    @Override
    public Membership addMembership(MembershipDTO membershipDTO) {
        Membership membership = membershipConverter.toMembership(membershipDTO);
        return membershipRepository.save(membership);
    }

    @Override
    public Membership updateMembership(MembershipDTO membershipDTO) {
        Membership membership = membershipConverter.toMembership(membershipDTO);
        return membershipRepository.save(membership);
    }

    @Override
    public boolean deleteMembership(Integer id) {
        try {
            membershipRepository.deleteById(id);
            return true;
        } catch (Exception e){
            return false;
        }
    }
}

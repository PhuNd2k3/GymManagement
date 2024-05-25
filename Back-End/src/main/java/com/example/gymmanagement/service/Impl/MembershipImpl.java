package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.dto.MembershipDTO;
import com.example.gymmanagement.entity.Membership;
import com.example.gymmanagement.repository.IMembershipRepository;
import com.example.gymmanagement.service.IMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MembershipImpl implements IMembershipService {
    @Autowired
    private IMembershipRepository membershipRepository;

    @Override
    public MembershipDTO getMembershipDetail(Long id) {
        Membership membership = membershipRepository.findById(id).get();
        int count = membership.getMembers().size();
        System.out.println(count);
        return null;
    }
}

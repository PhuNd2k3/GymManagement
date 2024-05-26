package com.example.gymmanagement.service;

import com.example.gymmanagement.dto.MembershipDTO;
import com.example.gymmanagement.entity.Membership;

import java.util.List;

public interface IMembershipService {
    MembershipDTO getMembershipDetail(Integer id);

    List<MembershipDTO> findAll();

    Membership addMembership(MembershipDTO membershipDTO);

    Membership updateMembership(MembershipDTO membershipDTO);

    boolean deleteMembership(Integer id);
}

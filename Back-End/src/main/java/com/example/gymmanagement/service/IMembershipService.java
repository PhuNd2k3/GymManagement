package com.example.gymmanagement.service;

import com.example.gymmanagement.dto.MembershipDTO;
import com.example.gymmanagement.entity.Membership;

import java.util.List;

public interface IMembershipService {
    MembershipDTO getMembershipDetail(Long id);

    List<MembershipDTO> findAll();

    Membership addMembership(Membership membership);

    Membership updateMembership(Membership updateMembership);

    boolean deleteMembership(Integer id);
}

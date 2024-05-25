package com.example.gymmanagement.service;

import com.example.gymmanagement.dto.MembershipDTO;

import java.util.List;

public interface IMembershipService {
    MembershipDTO getMembershipDetail(Long id);
    List<MembershipDTO> findAll();
}

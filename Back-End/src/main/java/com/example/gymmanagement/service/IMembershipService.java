package com.example.gymmanagement.service;

import com.example.gymmanagement.dto.MembershipDTO;

public interface IMembershipService {
    MembershipDTO getMembershipDetail(Long id);
}

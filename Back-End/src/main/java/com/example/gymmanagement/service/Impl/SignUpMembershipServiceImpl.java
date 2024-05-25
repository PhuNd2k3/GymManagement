package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.dto.request.SignUpMembershipRequest;
import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.Membership;
import com.example.gymmanagement.entity.SignUpMembership;
import com.example.gymmanagement.repository.IMemberRepository;
import com.example.gymmanagement.repository.IMembershipRepository;
import com.example.gymmanagement.repository.ISignUpMembershipRepository;
import com.example.gymmanagement.service.IMemberService;
import com.example.gymmanagement.service.ISignUpMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignUpMembershipServiceImpl implements ISignUpMembershipService {
    @Autowired
    private IMemberRepository memberRepository;

    @Autowired
    private IMembershipRepository membershipRepository;

    @Autowired
    private ISignUpMembershipRepository signUpMembershipRepository;
    @Override
    public SignUpMembership signUpMembership(SignUpMembershipRequest request) {
        Member member = memberRepository.findById(request.getMemberId()).get();
        Membership membership = membershipRepository.findById(request.getMembershipId()).get();
        SignUpMembership result = new SignUpMembership();
        result.setMembership(membership);
        result.setMember(member);
        result.setStatus("waiting");
        result.setPaymentMethod(result.getPaymentMethod());
        return signUpMembershipRepository.save(result);
    }
}

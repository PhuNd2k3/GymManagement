package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.converter.SignUpMembershipConverter;
import com.example.gymmanagement.dto.RegisterMembershipDTO;
import com.example.gymmanagement.dto.request.SignUpMembershipRequest;
import com.example.gymmanagement.dto.request.UpdateRegisterRequest;
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

import java.util.ArrayList;
import java.util.List;

@Service
public class SignUpMembershipServiceImpl implements ISignUpMembershipService {
    @Autowired
    private IMemberRepository memberRepository;

    @Autowired
    private IMembershipRepository membershipRepository;

    @Autowired
    private ISignUpMembershipRepository signUpMembershipRepository;

    @Autowired
    private SignUpMembershipConverter signUpMembershipConverter;
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

    @Override
    public List<RegisterMembershipDTO> getAll() {
        List<SignUpMembership> signUpMemberships = signUpMembershipRepository.findByStatus("waiting");
        List<RegisterMembershipDTO> result = new ArrayList<>();
        for(SignUpMembership it : signUpMemberships){
            result.add(signUpMembershipConverter.toRegisterMembershipDTO(it));
        }
        return result;
    }

    @Override
    public SignUpMembership updateMembershipRegister(UpdateRegisterRequest request) {
        Member member = memberRepository.findById(request.getMemberId()).get();
        Membership membership = membershipRepository.findById(request.getMembershipId()).get();
        SignUpMembership signUpMembership = signUpMembershipRepository.findById(request.getId()).get();
        signUpMembership.setStatus(request.getStatus());
        signUpMembership.setPaymentMethod(request.getPaymentMethod());
        signUpMembership.setMembership(membership);
        signUpMembership.setMember(member);
        return signUpMembershipRepository.save(signUpMembership);
    }
}

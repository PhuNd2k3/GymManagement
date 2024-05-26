package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.converter.MemberConverter;
import com.example.gymmanagement.dto.MemberDTO;
import com.example.gymmanagement.dto.request.LoginRequest;
import com.example.gymmanagement.dto.request.RegisterRequest;
import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.TrainingHistory;
import com.example.gymmanagement.repository.IFeedbackRepository;
import com.example.gymmanagement.repository.IMemberRepository;
import com.example.gymmanagement.repository.ISignUpMembershipRepository;
import com.example.gymmanagement.repository.ITrainingHistoryRepository;
import com.example.gymmanagement.service.IMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServiceImpl implements IMemberService {
    @Autowired
    private IMemberRepository memberRepository;

    @Autowired
    private MemberConverter memberConverter;

    @Autowired
    private ISignUpMembershipRepository signUpMembershipRepository;

    @Autowired
    private ITrainingHistoryRepository trainingHistory;

    @Autowired
    private IFeedbackRepository feedbackRepository;

    @Override
    public List<TrainingHistory> getTrainingHistory(Integer id) {
        List<TrainingHistory> trainingHistories = memberRepository.findById(id).get().getTrainingHistories();
        return trainingHistories;
    }

    @Override
    public MemberDTO getMember(Integer id) {
        Member memberEntity = memberRepository.findById(id).get();
        return memberConverter.toMemberDTO(memberEntity);
    }

    @Override
    public Boolean isLogin(LoginRequest loginRequest) {
        Member member = memberRepository.findMemberByPhoneNumber(loginRequest.getPhone());
        if(member == null){
            return false;
        }
        if(!member.getPassword().equals(loginRequest.getPassword())){
            return false;
        }
        return true;
    }

    @Override
    public Member addMember(RegisterRequest request) {
        Member member = memberConverter.toMember(request);
        return memberRepository.save(member);
    }

    @Override
    public boolean deleteMember(Integer id) {
        Member member = memberRepository.findById(id).get();
        if(member == null) return false;
        feedbackRepository.deleteAllByMemberId(member.getId());
        trainingHistory.deleteAllByMemberId(member.getId());
        signUpMembershipRepository.deleteAllByMemberId(member.getId());
        memberRepository.delete(member);
        return true;
    }
}

package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.converter.MemberConverter;
import com.example.gymmanagement.dto.MemberDTO;
import com.example.gymmanagement.dto.request.LoginRequest;
import com.example.gymmanagement.dto.request.MemberAdminRequest;
import com.example.gymmanagement.dto.request.MemberRequest;
import com.example.gymmanagement.dto.request.RegisterRequest;
import com.example.gymmanagement.dto.response.AgeResponse;
import com.example.gymmanagement.dto.response.LoginResponse;
import com.example.gymmanagement.dto.response.SaleResponse;
import com.example.gymmanagement.dto.response.StatisticsResponse;
import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.TrainingHistory;
import com.example.gymmanagement.handlers.Impl.MonthHandler;
import com.example.gymmanagement.handlers.Impl.WeekHandler;
import com.example.gymmanagement.handlers.Impl.YearHandler;
import com.example.gymmanagement.handlers.SaleStatisticsFactory;
import com.example.gymmanagement.handlers.SaleStatisticsHandler;
import com.example.gymmanagement.handlers.StatisticsHandler;
import com.example.gymmanagement.handlers.TrainingStatisticsHandler;
import com.example.gymmanagement.repository.*;
import com.example.gymmanagement.service.IMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.*;

@Service
public class MemberServiceImpl implements IMemberService {
    @Autowired
    private IMemberRepository memberRepository;

    @Autowired
    private IMembershipRepository membershipRepository;

    @Autowired
    private MemberConverter memberConverter;

    @Autowired
    private ISignUpMembershipRepository signUpMembershipRepository;

    @Autowired
    private ITrainingHistoryRepository trainingHistory;

    @Autowired
    private IFeedbackRepository feedbackRepository;
    @Autowired
    private SaleStatisticsFactory saleStatisticsFactory;

    private Map<Integer, StatisticsHandler> handlers = new HashMap<>();

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
    public LoginResponse isLogin(LoginRequest loginRequest) {
        LoginResponse result = new LoginResponse();
        Member member = memberRepository.findMemberByPhoneNumber(loginRequest.getPhone());
        if(member == null){
            result.setLogin(false);
            return result;
        }
        if(!member.getPassword().equals(loginRequest.getPassword())){
            result.setLogin(false);
            return result;
        }
        result.setLogin(true);
        result.setId(member.getId());
        return result;
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

    @Override
    public Member updateMember(MemberRequest request) {
        Member member = memberRepository.findById(request.getId()).get();
        member.setFullName(request.getFullName());
        member.setEmail(request.getEmail());
        member.setPhoneNumber(request.getPhoneNumber());
        member.setDob(request.getDob());
        member.setGender(request.getGender());
        return memberRepository.save(member);
    }

    @Override
    public List<MemberDTO> findAll() {
        List<Member> members = memberRepository.findAll();
        List<MemberDTO> result = new ArrayList<>();
        for(Member it : members){
            result.add(memberConverter.toMemberDTO(it));
        }
        return result;
    }

    @Override
    public Member addMemberOfAdmin(MemberAdminRequest request) {
        Member member = new Member();
        member.setFullName(request.getFullName());
        member.setEmail(request.getEmail());
        member.setDob(request.getDob());
        member.setPhoneNumber(request.getPhoneNumber());
        member.setGender(request.getGender());
        member.setMembership(membershipRepository.findById(request.getMembershipId()).get());
        member.setPassword("123456");
        return memberRepository.save(member);
    }

    @Override
    public Member updateMemberOfAdmin(MemberAdminRequest request) {
        Member member = memberRepository.findById(request.getId()).get();
        member.setFullName(request.getFullName());
        member.setEmail(request.getEmail());
        member.setDob(request.getDob());
        member.setPhoneNumber(request.getPhoneNumber());
        member.setGender(request.getGender());
        member.setPassword("123456");
        member.setMembership(membershipRepository.findById(request.getMembershipId()).get());
        return memberRepository.save(member);
    }


    @Autowired
    public MemberServiceImpl(IMemberRepository memberRepository, IMembershipRepository membershipRepository, MemberConverter memberConverter, ISignUpMembershipRepository signUpMembershipRepository, ITrainingHistoryRepository trainingHistory, IFeedbackRepository feedbackRepository, WeekHandler weekHandler, MonthHandler monthHandler, YearHandler yearHandler) {
        this.memberRepository = memberRepository;
        this.membershipRepository = membershipRepository;
        this.memberConverter = memberConverter;
        this.signUpMembershipRepository = signUpMembershipRepository;
        this.trainingHistory = trainingHistory;
        this.feedbackRepository = feedbackRepository;
        handlers.put(1, weekHandler); // Đăng ký xử lý cho tuần
        handlers.put(2, monthHandler);
        handlers.put(3,yearHandler);
        // Đăng ký thêm các loại handler khác nếu cần
    }



    @Override
    public StatisticsResponse getStatistics(Integer type) {
        StatisticsHandler handler = handlers.get(type);
        if (handler != null) {
            return handler.handle(type);
        }
        return null;
    }

    @Override
    public AgeResponse getAge() {
        AgeResponse result = new AgeResponse();
        List<Member> members = memberRepository.findAll();
        int currentYear = LocalDate.now().getYear();
        result.setTotal(members.size());
        for (Member it : members) {
            int birthYear = it.getDob().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear();
            int age = currentYear - birthYear;

            if (age >= 17 && age < 25) {
                result.setAgeFrom17To25(result.getAgeFrom17To25() + 1);
            } else if (age >= 25 && age < 35) {
                result.setAgeFrom25To35(result.getAgeFrom25To35() + 1);
            } else {
                result.setAgeOver35(result.getAgeOver35() + 1);
            }
        }
        return result;
    }

    @Override
    public SaleResponse getSales(Integer type) {
        SaleStatisticsHandler saleStatisticsHandler = saleStatisticsFactory.getSaleStatistics(type);
        return saleStatisticsHandler.handle();
    }
}

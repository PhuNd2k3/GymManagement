package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.converter.SignUpMembershipConverter;
import com.example.gymmanagement.dto.RegisterMembershipDTO;
import com.example.gymmanagement.dto.request.SignUpMembershipRequest;
import com.example.gymmanagement.dto.request.UpdateRegisterRequest;
import com.example.gymmanagement.dto.response.StatisticsResponse;
import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.Membership;
import com.example.gymmanagement.entity.SignUpMembership;
import com.example.gymmanagement.handlers.SignUpStatisticsFactory;
import com.example.gymmanagement.handlers.SignUpStatisticsHandler;
import com.example.gymmanagement.repository.IMemberRepository;
import com.example.gymmanagement.repository.IMembershipRepository;
import com.example.gymmanagement.repository.ISignUpMembershipRepository;
import com.example.gymmanagement.service.ISignUpMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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

    @Autowired
    private SignUpStatisticsFactory signUpStatisticsFactory;

    @Override
    public SignUpMembership signUpMembership(SignUpMembershipRequest request) {
        Member member = memberRepository.findById(request.getMemberId()).get();
        Membership membership = membershipRepository.findById(request.getMembershipId()).get();
        SignUpMembership result = new SignUpMembership();
        result.setMembership(membership);
        result.setMember(member);
        result.setStatus("Waiting");
        result.setPaymentMethod(request.getPaymentMethod());
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
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());

        // Lấy membership từ repository, xử lý trường hợp không tồn tại
        Membership membership = membershipRepository.findById(request.getMembershipId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid membership ID"));

        // Cộng thêm số ngày của membership vào ngày hiện tại
        calendar.add(Calendar.DAY_OF_MONTH, membership.getPeriod());
        Date newDate = calendar.getTime();

        // Lấy member từ repository, xử lý trường hợp không tồn tại
        Member member = memberRepository.findById(request.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid member ID"));

        // Cập nhật thời gian membership cho member
        member.setMembershipPeriod(newDate);

        // Lấy SignUpMembership từ repository, xử lý trường hợp không tồn tại
        SignUpMembership signUpMembership = signUpMembershipRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid sign-up membership ID"));

        // Cập nhật các thông tin cho SignUpMembership
        signUpMembership.setStatus(request.getStatus());
        signUpMembership.setPaymentMethod(request.getPaymentMethod());
        signUpMembership.setMembership(membership);
        signUpMembership.setMember(member);

        // Cập nhật membership cho member
        member.setMembership(membership);

        // Lưu member và signUpMembership
        memberRepository.save(member);
        return signUpMembershipRepository.save(signUpMembership);
    }


    @Override
    public StatisticsResponse getSignUpStatistics(Integer type) {
        SignUpStatisticsHandler signUpStatisticsHandler = signUpStatisticsFactory.getSignUpStatistics(type);
        return signUpStatisticsHandler.handle();
    }
}

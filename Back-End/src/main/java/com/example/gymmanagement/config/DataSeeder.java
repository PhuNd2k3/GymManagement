package com.example.gymmanagement.config;

import com.example.gymmanagement.entity.Membership;
import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.repository.IMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;
import com.example.gymmanagement.repository.IMembershipRepository;
@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private IMembershipRepository membershipRepository;

    @Autowired
    private IMemberRepository memberRepository;

    @Override
    public void run(String... args) throws Exception {
        // Tạo dữ liệu cho bảng membership
        Membership membership1 = new Membership();
        membership1.setName("Silver");
        membership1.setPrice(200);
        membership1.setPeriod(30);
        membershipRepository.save(membership1);

        Membership membership2 = new Membership();
        membership2.setName("Gold");
        membership2.setPrice(300);
        membership2.setPeriod(60);
        membershipRepository.save(membership2);

        // Tạo dữ liệu cho bảng member
        for (int i = 1; i <= 5; i++) {
            Member member = new Member();
            member.setFullName("User " + i);
            member.setEmail("user" + i + "@example.com");
            member.setPassword("password");
            member.setDob(Date.valueOf(LocalDate.of(1990, 1, 1)));
            member.setMembershipPeriod(Date.valueOf(LocalDate.now().plusDays(30)));
            member.setMembership(membership1);
            memberRepository.save(member);
        }

    }
}

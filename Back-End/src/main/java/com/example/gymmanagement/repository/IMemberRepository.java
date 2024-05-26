package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IMemberRepository extends JpaRepository<Member,Integer> {
    Member findMemberByPhoneNumber(String phone);
    List<Member> findAllByMembershipId(Integer id);
}

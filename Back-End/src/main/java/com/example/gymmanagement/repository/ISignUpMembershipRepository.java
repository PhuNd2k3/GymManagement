package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.SignUpMembership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ISignUpMembershipRepository extends JpaRepository<SignUpMembership,Integer> {
    List<SignUpMembership> findByStatus(String waiting);

    void deleteAllByMemberId(Integer id);
}

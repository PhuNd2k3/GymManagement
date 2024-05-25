package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.SignUpMembership;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISignUpMembershipRepository extends JpaRepository<SignUpMembership,Integer> {
}

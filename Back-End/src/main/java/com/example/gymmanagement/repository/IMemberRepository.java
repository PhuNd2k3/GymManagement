package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMemberRepository extends JpaRepository<Member,Long> {
}

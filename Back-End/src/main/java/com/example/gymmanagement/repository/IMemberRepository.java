package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface IMemberRepository extends JpaRepository<Member,Integer> {
    Member findMemberByPhoneNumber(String phone);
    List<Member> findAllByMembershipId(Integer id);
    @Query("SELECT m FROM Member m WHERE m.registerDate >= :start AND m.registerDate <= :end")
    List<Member> findByRegisterDateBetween(@Param("start") Date start, @Param("end") Date end);
    @Query("SELECT m FROM Member m WHERE m.registerDate >= :start AND m.registerDate < :end")
    List<Member> findByRegisterDateBetweenBefore(@Param("start") Date start, @Param("end") Date end);
}

package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.SignUpMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ISignUpMembershipRepository extends JpaRepository<SignUpMembership,Integer> {
    List<SignUpMembership> findByStatus(String waiting);

    void deleteAllByMemberId(Integer id);
    void deleteAllByMembershipId(Integer id);

    @Query("SELECT s FROM SignUpMembership s WHERE s.signUpDate >= :start AND s.signUpDate <= :end AND s.status=:status")
    List<SignUpMembership> findBySignUpDateBetween(@Param("start") Date start, @Param("end") Date end, @Param("status") String status);
    @Query("SELECT s FROM SignUpMembership s WHERE s.signUpDate >= :start AND s.signUpDate < :end AND s.status=:status")
    List<SignUpMembership> findBySignUpDateBetweenBefore(@Param("start") Date start, @Param("end") Date end, @Param("status") String status);
}

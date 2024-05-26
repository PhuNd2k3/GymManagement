package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMembershipRepository extends JpaRepository<Membership,Integer> {
    void deleteById(Integer id);
}

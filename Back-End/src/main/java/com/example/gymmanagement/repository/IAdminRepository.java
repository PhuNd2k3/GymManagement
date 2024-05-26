package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAdminRepository extends JpaRepository<Admin,Integer> {
    Admin findAdminByPhoneNumber(String phoneNumber);
}

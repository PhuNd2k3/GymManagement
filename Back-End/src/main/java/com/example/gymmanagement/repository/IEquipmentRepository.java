package com.example.gymmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gymmanagement.entity.Equipment;

public interface IEquipmentRepository extends JpaRepository<Equipment, Integer> {

}

package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.TrainingHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITrainingHistoryRepository extends JpaRepository<TrainingHistory,Integer> {
    void deleteAllByMemberId(Integer id);
}

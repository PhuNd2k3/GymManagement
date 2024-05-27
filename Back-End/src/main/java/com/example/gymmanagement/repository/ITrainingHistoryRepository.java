package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.TrainingHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ITrainingHistoryRepository extends JpaRepository<TrainingHistory,Integer> {
    void deleteAllByMemberId(Integer id);

    List<TrainingHistory> findByMemberId(Integer id);

    List<TrainingHistory> findByMemberIdAndTrainingTimeBetween(Integer id,Date start,Date end);
}

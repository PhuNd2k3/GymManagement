package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.SignUpMembership;
import com.example.gymmanagement.entity.TrainingHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ITrainingHistoryRepository extends JpaRepository<TrainingHistory,Integer> {
    void deleteAllByMemberId(Integer id);

    List<TrainingHistory> findByMemberId(Integer id);

    List<TrainingHistory> findByMemberIdAndTrainingTimeBetween(Integer id,Date start,Date end);

    @Query("SELECT s FROM TrainingHistory s WHERE s.trainingTime >= :start AND s.trainingTime <= :end")
    List<TrainingHistory> findByTrainingTimeBetween(@Param("start") Date start, @Param("end") Date end);

    @Query("SELECT s FROM TrainingHistory s WHERE s.trainingTime >= :start AND s.trainingTime < :end")
    List<TrainingHistory> findByTrainingTimeBetweenBefore(@Param("start") Date start, @Param("end") Date end);

}

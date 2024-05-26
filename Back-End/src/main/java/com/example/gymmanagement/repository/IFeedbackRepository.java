package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IFeedbackRepository extends JpaRepository<Feedback,Integer> {
    void deleteAllByMemberId(Integer id);
    List<Feedback> findAllByMemberId(Integer id);
}

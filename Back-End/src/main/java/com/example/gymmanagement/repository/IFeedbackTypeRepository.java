package com.example.gymmanagement.repository;

import com.example.gymmanagement.entity.FeedbackType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFeedbackTypeRepository extends JpaRepository<FeedbackType,Integer> {
}

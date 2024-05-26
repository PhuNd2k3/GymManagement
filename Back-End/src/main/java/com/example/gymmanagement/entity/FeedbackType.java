package com.example.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "feedback_type")
public class FeedbackType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "feedback_type_name")
    private String name;

    @OneToMany(mappedBy = "feedbackType")
    List<Feedback> feedbacks;
}

package com.example.gymmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "training_history")
public class TrainingHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "training_time")
    private Date trainingTime;

    @ManyToOne
    @JoinColumn(name = "member_id",nullable = false)
    @JsonBackReference
    private Member member;
}

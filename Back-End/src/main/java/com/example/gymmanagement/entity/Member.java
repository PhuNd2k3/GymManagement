package com.example.gymmanagement.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "member")
public class Member extends User {
    @Column(name = "membership_period")
    private Date membershipPeriod;

    @ManyToOne
    @JoinColumn(name = "membership_id",nullable = false)
    private Membership membership;

    @OneToMany(mappedBy = "member",fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<TrainingHistory> trainingHistories;

    @OneToMany(mappedBy = "member",fetch = FetchType.LAZY)
    private List<SignUpMembership> signUpMemberships;

    @OneToMany(mappedBy = "member",fetch = FetchType.LAZY)
    private List<Feedback> feedbacks;
}

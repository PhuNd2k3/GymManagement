package com.example.gymmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "member")
public class Member extends User {
    @Column(name = "membership_period")
    private Date membershipPeriod;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "membership_id")
    private Membership membership;

    @OneToMany(mappedBy = "member",fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<TrainingHistory> trainingHistories;

    @OneToMany(mappedBy = "member",fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<SignUpMembership> signUpMemberships;

    @OneToMany(mappedBy = "member",fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Feedback> feedbacks;
}

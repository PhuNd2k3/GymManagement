package com.example.gymmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.List;

@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "member")
public class Member extends User {
    @Column(name = "membership_period")
    private Date membershipPeriod;

    @Column(name = "register_date")
    private Date registerDate;

    @ManyToOne(fetch = FetchType.LAZY)
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

    public Date getMembershipPeriod() {
        return membershipPeriod;
    }

    public void setMembershipPeriod(Date membershipPeriod) {
        this.membershipPeriod = membershipPeriod;
    }

    public Membership getMembership() {
        return membership;
    }

    public void setMembership(Membership membership) {
        this.membership = membership;
    }

    public List<TrainingHistory> getTrainingHistories() {
        return trainingHistories;
    }

    public void setTrainingHistories(List<TrainingHistory> trainingHistories) {
        this.trainingHistories = trainingHistories;
    }

    public List<SignUpMembership> getSignUpMemberships() {
        return signUpMemberships;
    }

    public void setSignUpMemberships(List<SignUpMembership> signUpMemberships) {
        this.signUpMemberships = signUpMemberships;
    }

    public List<Feedback> getFeedbacks() {
        return feedbacks;
    }

    public void setFeedbacks(List<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
    }
}

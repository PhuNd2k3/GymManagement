package com.example.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "password")
    private String password;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "membership_period")
    private Date membershipPeriod;

    @Column(name = "gender")
    private String gender;

    @ManyToOne
    @JoinColumn(name = "membership_id",nullable = false)
    private Membership membership;

    @OneToMany(mappedBy = "member")
    private List<TrainingHistory> trainingHistories;

    @OneToMany(mappedBy = "member")
    private List<SignUpMembership> signUpMemberships;
}

package com.example.gymmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@Table(name = "membership")
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "numbers_of_training_per_week")
    private Integer numbersOfTrainingPerWeek;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Integer price;

    @Column(name = "period")
    private Integer period;

    @OneToMany(mappedBy = "membership",fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Member> members;

    @OneToMany(mappedBy = "membership",fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<SignUpMembership> signUpMemberships;

}

package com.example.gymmanagement.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="membership")
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numbers_of_training_per_week")
    private Integer numberOfTrainingPerWeek;

    @Column(name = "price")
    private Integer price;

    @Column(name = "period")
    private Integer period;

    @OneToMany(mappedBy = "membership")
    private List<Member> members;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumberOfTrainingPerWeek() {
        return numberOfTrainingPerWeek;
    }

    public void setNumberOfTrainingPerWeek(Integer numberOfTrainingPerWeek) {
        this.numberOfTrainingPerWeek = numberOfTrainingPerWeek;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getPeriod() {
        return period;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }

    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }
}

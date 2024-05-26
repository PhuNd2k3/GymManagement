package com.example.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "admin")
public class  Admin extends User{
    @OneToMany(mappedBy = "admin",fetch = FetchType.LAZY)
    private List<Feedback> feedbacks;
}

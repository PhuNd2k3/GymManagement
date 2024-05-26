package com.example.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "admin")
public class  Admin extends User{
    @OneToMany(mappedBy = "admin")
    private List<Feedback> feedbacks;
}

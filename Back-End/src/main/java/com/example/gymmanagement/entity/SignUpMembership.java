package com.example.gymmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "sign_up_membership")
public class SignUpMembership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "status")
    private String status;

    @Column(name = "sign_up_date")
    private Date signUpDate;

    @Column(name = "reply_date")
    private Date replyDate;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "membership_id")
    private Membership membership;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "member")
    private Member member;


}

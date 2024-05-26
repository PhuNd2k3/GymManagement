package com.example.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "feedback_time")
    private Date feedbackTime;

    @Column(name = "feedback_detail")
    private String feedbackDetail;

    @Column(name = "reply_context")
    private String replyContext;

    @ManyToOne
    @JoinColumn(name = "feedback_type_id")
    private FeedbackType feedbackType;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

}

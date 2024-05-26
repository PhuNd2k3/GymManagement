package com.example.gymmanagement.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class FeedbackResponseDetail {
    private Integer id;
    private Date feedbackTime;
    private String feedbackType;
    private String feedbackDetail;
    private String replyContent;
}

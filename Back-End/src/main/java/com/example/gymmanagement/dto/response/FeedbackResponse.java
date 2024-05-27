package com.example.gymmanagement.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class FeedbackResponse {
    private Integer id;
    private String feedbackTime;
    private boolean isReply;
    private String feedbackType;
    private String feedbackDetail;
    private String replyContent;
}

package com.example.gymmanagement.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class MemberFeedbackResponse {
    private Integer id;
    private String memberName;
    private String feedbackDetail;
    private String feedbackType;
    private Date feedbackTime;
    private String replyContent;
}

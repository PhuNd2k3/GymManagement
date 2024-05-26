package com.example.gymmanagement.dto.response;

import lombok.Data;

@Data
public class MemberFeedbackResponse {
    private Integer id;
    private String memberName;
    private String feedbackDetail;
}

package com.example.gymmanagement.dto;

import lombok.Data;

@Data
public class FeedbackDTO {
    private Integer id;
    private Integer feedbackTypeId;
    private Integer memberId;
    private String feedbackDetail;
}

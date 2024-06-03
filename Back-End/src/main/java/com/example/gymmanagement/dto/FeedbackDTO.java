package com.example.gymmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FeedbackDTO {
    private Integer id;
    private Integer feedbackTypeId;
    private Integer memberId;

    @NotBlank(message = "Feedback not blank")
    private String feedbackDetail;
}

package com.example.gymmanagement.service;

import com.example.gymmanagement.dto.FeedbackDTO;
import com.example.gymmanagement.dto.response.FeedbackResponse;
import com.example.gymmanagement.entity.Feedback;

import java.util.List;

public interface IFeedbackService {
    Feedback sendFeedback(FeedbackDTO feedback);
    List<FeedbackResponse> getAll(Integer id);
}

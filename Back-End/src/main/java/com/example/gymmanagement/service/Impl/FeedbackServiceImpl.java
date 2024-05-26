package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.converter.FeedbackConverter;
import com.example.gymmanagement.dto.FeedbackDTO;
import com.example.gymmanagement.dto.response.FeedbackResponse;
import com.example.gymmanagement.entity.Feedback;
import com.example.gymmanagement.repository.IFeedbackRepository;
import com.example.gymmanagement.service.IFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FeedbackServiceImpl implements IFeedbackService {
    @Autowired
    private IFeedbackRepository feedbackRepository;
    @Autowired
    private FeedbackConverter feedbackConverter;
    @Override
    public Feedback sendFeedback(FeedbackDTO feedbackDTO) {
        return feedbackRepository.save(feedbackConverter.toFeedback(feedbackDTO));
    }

    @Override
    public List<FeedbackResponse> getAll(Integer id) {
        List<Feedback> feedbacks = feedbackRepository.findAllByMemberId(id);
        List<FeedbackResponse> result = new ArrayList<>();
        for(Feedback it : feedbacks){
            result.add(feedbackConverter.toFeedbackResponse(it));
        }
        return result;
    }
}

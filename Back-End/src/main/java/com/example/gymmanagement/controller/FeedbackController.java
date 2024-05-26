package com.example.gymmanagement.controller;

import com.example.gymmanagement.entity.FeedbackType;
import com.example.gymmanagement.service.IFeedBackTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FeedbackController {
    @Autowired
    private IFeedBackTypeService feedBackTypeService;

    @GetMapping(value = "/feedback_type")
    public List<FeedbackType> getFeedbackTypes(){
        List<FeedbackType> feedbackTypes = feedBackTypeService.getFeedbackTypes();
        return feedbackTypes;
    }
}

package com.example.gymmanagement.controller;

import com.example.gymmanagement.dto.FeedbackDTO;
import com.example.gymmanagement.dto.response.FeedbackResponse;
import com.example.gymmanagement.entity.Feedback;
import com.example.gymmanagement.entity.FeedbackType;
import com.example.gymmanagement.service.IFeedBackTypeService;
import com.example.gymmanagement.service.IFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FeedbackController {
    @Autowired
    private IFeedBackTypeService feedBackTypeService;

    @Autowired
    private IFeedbackService feedbackService;

    @GetMapping(value = "/feedback_type")
    public List<FeedbackType> getFeedbackTypes(){
        List<FeedbackType> feedbackTypes = feedBackTypeService.getFeedbackTypes();
        return feedbackTypes;
    }

    @PostMapping(value = "/feedback/send")
    public ResponseEntity<String> sendFeedback(@RequestBody FeedbackDTO feedback){
        Feedback sendFeekback = feedbackService.sendFeedback(feedback);
        if(sendFeekback!=null){
            return new ResponseEntity<String>("Successful send feedback", HttpStatus.OK);
        }else {
            return new ResponseEntity<String>("Error send feeback",HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/feedback/view/{id}")
    public List<FeedbackResponse> getFeedbacks(@PathVariable Integer id){
        List<FeedbackResponse> responses = new ArrayList<>();
        responses = feedbackService.getAll(id);
        return responses;
    }
}

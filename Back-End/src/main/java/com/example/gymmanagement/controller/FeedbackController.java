package com.example.gymmanagement.controller;

import com.example.gymmanagement.dto.FeedbackDTO;
import com.example.gymmanagement.dto.request.ReplyFeedbackRequest;
import com.example.gymmanagement.dto.response.FeedbackResponse;
import com.example.gymmanagement.dto.response.FeedbackResponseDetail;
import com.example.gymmanagement.dto.response.MemberFeedbackResponse;
import com.example.gymmanagement.entity.Feedback;
import com.example.gymmanagement.entity.FeedbackType;
import com.example.gymmanagement.service.IFeedBackTypeService;
import com.example.gymmanagement.service.IFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
    public List<FeedbackType> getFeedbackTypes() {
        List<FeedbackType> feedbackTypes = feedBackTypeService.getFeedbackTypes();
        return feedbackTypes;
    }

    @PostMapping(value = "/feedback/send")
    public ResponseEntity<String> sendFeedback(@RequestBody @Validated FeedbackDTO feedback) {
        Feedback sendFeedback = feedbackService.sendFeedback(feedback);
        if (sendFeedback != null) {
            return new ResponseEntity<String>("Successful send feedback: " + sendFeedback.getFeedbackDetail(), HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Error send feedback", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/feedback/view/{id}")
    public List<FeedbackResponse> getFeedbacks(@PathVariable Integer id) {
        List<FeedbackResponse> responses = new ArrayList<>();
        responses = feedbackService.getAll(id);
        return responses;
    }

    @GetMapping(value = "/feedback/detail/{id}")
    public FeedbackResponseDetail getFeedback(@PathVariable Integer id) {
        FeedbackResponseDetail result = feedbackService.getFeedbackDetail(id);
        return result;
    }

    @GetMapping(value = "/feedback/all")
    public List<MemberFeedbackResponse> getAllFeedback() {
        List<MemberFeedbackResponse> result = feedbackService.getAllMemberFeedback();
        return result;
    }

    @PutMapping(value = "/feedback/reply")
    public ResponseEntity<String> replyFeedback(@RequestBody ReplyFeedbackRequest request) {
        Feedback replyFeedback = feedbackService.replyFeedback(request);
        if (replyFeedback != null) {
            return new ResponseEntity<String>("Successful reply feedback", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Error send feeback", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/feedback/delete/{id}")
    public ResponseEntity<String> deleteMembership(@PathVariable Integer id) {
        boolean isRemoved = feedbackService.deleteFeedback(id);
        if (isRemoved) {
            return new ResponseEntity<>("Feedback deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Feedback delete error", HttpStatus.BAD_REQUEST);
        }
    }
}

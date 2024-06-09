package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.converter.FeedbackConverter;
import com.example.gymmanagement.dto.FeedbackDTO;
import com.example.gymmanagement.dto.request.ReplyFeedbackRequest;
import com.example.gymmanagement.dto.response.FeedbackResponse;
import com.example.gymmanagement.dto.response.FeedbackResponseDetail;
import com.example.gymmanagement.dto.response.MemberFeedbackResponse;
import com.example.gymmanagement.entity.Feedback;
import com.example.gymmanagement.repository.IAdminRepository;
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
    @Autowired
    private IAdminRepository adminRepository;
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

    @Override
    public FeedbackResponseDetail getFeedbackDetail(Integer id) {
        Feedback feedback = feedbackRepository.findById(id).get();
        FeedbackResponseDetail result = new FeedbackResponseDetail();
        result.setId(feedback.getId());
        result.setFeedbackDetail(feedback.getFeedbackDetail());
        result.setFeedbackTime(feedback.getFeedbackTime());
        result.setReplyContent(feedback.getReplyContent());
        result.setFeedbackType(feedback.getFeedbackType().getName());
        return result;
    }

    @Override
    public List<MemberFeedbackResponse> getAllMemberFeedback() {
        List<MemberFeedbackResponse> result = new ArrayList<>();
        List<Feedback> feedbacks = feedbackRepository.findAll();
        for(Feedback it : feedbacks){
            MemberFeedbackResponse memberFeedbackResponse = new MemberFeedbackResponse();
            memberFeedbackResponse.setId(it.getId());
            memberFeedbackResponse.setMemberName(it.getMember().getFullName());
            memberFeedbackResponse.setFeedbackDetail(it.getFeedbackDetail());
            memberFeedbackResponse.setFeedbackTime(it.getFeedbackTime());
            memberFeedbackResponse.setFeedbackType(it.getFeedbackType().getName());
            memberFeedbackResponse.setReplyContent(it.getReplyContent());
            result.add(memberFeedbackResponse);
        }
        return result;
    }

    @Override
    public Feedback replyFeedback(ReplyFeedbackRequest request) {
        Feedback feedback = feedbackRepository.findById(request.getId()).get();
        feedback.setAdmin(adminRepository.findById(1).get());
        feedback.setReplyContent(request.getReplyContent());
        return feedbackRepository.save(feedback);
    }

    @Override
    public boolean deleteFeedback(Integer id) {
        Feedback feedback = feedbackRepository.findById(id).get();
        if(feedback == null) return false;
        feedbackRepository.deleteById(id);
        return true;
    }
}

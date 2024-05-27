package com.example.gymmanagement.converter;

import com.example.gymmanagement.dto.FeedbackDTO;
import com.example.gymmanagement.dto.response.FeedbackResponse;
import com.example.gymmanagement.entity.Feedback;
import com.example.gymmanagement.repository.IAdminRepository;
import com.example.gymmanagement.repository.IFeedbackTypeRepository;
import com.example.gymmanagement.repository.IMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class FeedbackConverter {
    @Autowired
    private IMemberRepository memberRepository;
    @Autowired
    private IFeedbackTypeRepository feedbackTypeRepository;

    public Feedback toFeedback(FeedbackDTO feedbackDTO) {
        Feedback result = new Feedback();
        result.setFeedbackTime(new Date());
        result.setFeedbackDetail(feedbackDTO.getFeedbackDetail());
        result.setMember(memberRepository.findById(feedbackDTO.getMemberId()).get());
        result.setFeedbackType(feedbackTypeRepository.findById(feedbackDTO.getFeedbackTypeId()).get());
        return result;
    }

    public FeedbackResponse toFeedbackResponse(Feedback feedback) {
        FeedbackResponse result = new FeedbackResponse();
        result.setId(feedback.getId());
        if(feedback.getReplyContent()==null) {
            result.setReply(false);
        } else {
            result.setReply(true);
            result.setReplyContent(feedback.getReplyContent());
        }
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        String formattedDate = formatter.format(feedback.getFeedbackTime());
        result.setFeedbackTime(formattedDate);
        result.setFeedbackType(feedback.getFeedbackType().getName());
        result.setFeedbackDetail(feedback.getFeedbackDetail());
        return result;
    }
}

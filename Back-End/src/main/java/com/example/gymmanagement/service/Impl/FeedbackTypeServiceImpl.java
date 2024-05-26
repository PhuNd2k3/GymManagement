package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.entity.FeedbackType;
import com.example.gymmanagement.repository.IFeedbackTypeRepository;
import com.example.gymmanagement.service.IFeedBackTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackTypeServiceImpl implements IFeedBackTypeService {
    @Autowired
    private IFeedbackTypeRepository feedbackTypeRepository;
    @Override
    public List<FeedbackType> getFeedbackTypes() {
        return feedbackTypeRepository.findAll();
    }
}

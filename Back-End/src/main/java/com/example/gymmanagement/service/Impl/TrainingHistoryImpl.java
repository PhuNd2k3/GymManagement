package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.TrainingHistory;
import com.example.gymmanagement.repository.IMemberRepository;
import com.example.gymmanagement.repository.ITrainingHistoryRepository;
import com.example.gymmanagement.service.ITrainingHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TrainingHistoryImpl implements ITrainingHistoryService {
    @Autowired
    private IMemberRepository memberRepository;
    @Autowired
    private ITrainingHistoryRepository traningHistoryRepository;
    @Override
    public void addTraining(Integer id) {
        Member member = memberRepository.findById(id).get();
        TrainingHistory trainingHistory = new TrainingHistory();
        trainingHistory.setMember(member);
        trainingHistory.setTrainingTime(new Date());
        traningHistoryRepository.save(trainingHistory);
    }
}

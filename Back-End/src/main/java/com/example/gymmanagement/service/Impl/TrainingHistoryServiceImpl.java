package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.dto.response.StatisticsResponse;
import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.TrainingHistory;
import com.example.gymmanagement.handlers.SignUpStatisticsHandler;
import com.example.gymmanagement.handlers.TrainingStatisticsFactory;
import com.example.gymmanagement.handlers.TrainingStatisticsHandler;
import com.example.gymmanagement.repository.IMemberRepository;
import com.example.gymmanagement.repository.ITrainingHistoryRepository;
import com.example.gymmanagement.service.ITrainingHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class TrainingHistoryServiceImpl implements ITrainingHistoryService {
    @Autowired
    private IMemberRepository memberRepository;
    @Autowired
    private ITrainingHistoryRepository trainingHistoryRepository;
    @Autowired
    private TrainingStatisticsFactory trainingStatisticsFactory;

    @Override
    public void addTraining(Integer id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new NullPointerException("Không tìm thấy thành viên với id: " + id));
        Date today = resetTime(new Date());
        List<TrainingHistory> trainingHistories = member.getTrainingHistories();
        for (TrainingHistory it : trainingHistories) {
            System.out.println(resetTime(it.getTrainingTime()));
            if (resetTime(it.getTrainingTime()).equals(resetTime(today))) {
                throw new IllegalStateException(
                        "Thành viên " + it.getMember().getFullName() + " hôm nay đã điểm danh rồi!");
            }
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(today);

        // Thiết lập ngày trong tuần là ngày đầu tiên (ngày thứ Hai)
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);

        // Lấy ngày đầu tiên của tuần
        Date startOfWeek = calendar.getTime();
        List<TrainingHistory> trainingHistories1 = trainingHistoryRepository.findByMemberIdAndTrainingTimeBetween(id,
                resetTime(startOfWeek), new Date());
        if (trainingHistories1.size() >= member.getMembership().getNumbersOfTrainingPerWeek()) {
            throw new IllegalArgumentException(
                    "Thành viên " + member.getFullName() + " đã tập quá số buổi của khóa học rồi!");
        }
        TrainingHistory trainingHistory = new TrainingHistory();
        trainingHistory.setMember(member);
        trainingHistory.setTrainingTime(new Date());
        trainingHistoryRepository.save(trainingHistory);
    }

    @Override
    public StatisticsResponse getTrainingStatistics(Integer type) {
        TrainingStatisticsHandler signUpStatisticsHandler = trainingStatisticsFactory.getTrainingStatistics(type);
        return signUpStatisticsHandler.handle();
    }

    private Date resetTime(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }
}

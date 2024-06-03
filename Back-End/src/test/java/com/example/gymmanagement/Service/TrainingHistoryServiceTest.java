package com.example.gymmanagement.Service;

import com.example.gymmanagement.entity.Member;
import com.example.gymmanagement.entity.Membership;
import com.example.gymmanagement.entity.TrainingHistory;
import com.example.gymmanagement.repository.IMemberRepository;
import com.example.gymmanagement.repository.ITrainingHistoryRepository;
import com.example.gymmanagement.service.ITrainingHistoryService;
import com.example.gymmanagement.service.Impl.TrainingHistoryServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
public class TrainingHistoryServiceTest {

    @Mock
    private IMemberRepository memberRepository;

    @Mock
    private ITrainingHistoryRepository trainingHistoryRepository;

    @InjectMocks
    private ITrainingHistoryService trainingHistoryService = new TrainingHistoryServiceImpl();

    @Test
    public void testAddTraining_MemberNotFound() {
        // Arrange
        Integer memberId = 1;
        when(memberRepository.findById(memberId)).thenReturn(Optional.empty());

        // Act + Assert
        assertThrows(NullPointerException.class, () -> {
            trainingHistoryService.addTraining(memberId);
        });

        // Verify
        verify(memberRepository, times(1)).findById(memberId);
        verifyNoMoreInteractions(memberRepository, trainingHistoryRepository);
    }

    @Test
    public void testAddTraining_AlreadyCheckedInTwice() {
        // Arrange
        Integer memberId = 1;
        Member member = new Member();
        member.setId(memberId);
        member.setFullName("John Doe");

        Date today = new Date();

        List<TrainingHistory> trainingHistory = new ArrayList<TrainingHistory>();
        TrainingHistory newTrainingHistory = new TrainingHistory();
        newTrainingHistory.setMember(member);
        newTrainingHistory.setTrainingTime(today);
        trainingHistory.add(newTrainingHistory);

        member.setTrainingHistories(trainingHistory);

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(member));
        // Act + Assert
        assertThrows(IllegalStateException.class, () -> {
            trainingHistoryService.addTraining(memberId);
        });

        // Verify
        verify(memberRepository, times(1)).findById(memberId);
    }

    @Test
    public void testAddTraining_ExceededWeeklyLimit() {
        Integer memberId = 1;
        Member member = new Member();
        member.setId(memberId);
        member.setFullName("John Doe");

        Membership membership = new Membership();
        membership.setNumbersOfTrainingPerWeek(0);

        member.setMembership(membership);
        List<Member> members = new ArrayList<>();
        members.add(member);
        membership.setMembers(members);

        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);

        LocalDate desiredDay = startOfWeek;
        for (int i = 0; i < 7; i++) {
            desiredDay = startOfWeek.plusDays(i);
            if (!desiredDay.equals(today)) {
                break;
            }
        }

        Date date = Date.from(desiredDay.atStartOfDay(ZoneId.systemDefault()).toInstant());

        List<TrainingHistory> trainingHistory = new ArrayList<>();
        TrainingHistory newTrainingHistory = new TrainingHistory();
        newTrainingHistory.setMember(member);
        newTrainingHistory.setTrainingTime(date);
        trainingHistory.add(newTrainingHistory);

        member.setTrainingHistories(trainingHistory);

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(member));
        when(trainingHistoryRepository.findByMemberIdAndTrainingTimeBetween(eq(memberId),
                eq(Date.from(startOfWeek.atStartOfDay(ZoneId.systemDefault()).toInstant())),
                any(Date.class))).thenReturn(trainingHistory);

        // Act + Assert
        assertThrows(IllegalArgumentException.class, () -> {
            trainingHistoryService.addTraining(memberId);
        });

        // Verify
        verify(memberRepository, times(1)).findById(memberId);
        verify(trainingHistoryRepository, times(1)).findByMemberIdAndTrainingTimeBetween(eq(memberId),
                eq(Date.from(startOfWeek.atStartOfDay(ZoneId.systemDefault()).toInstant())),
                any(Date.class));
    }

}
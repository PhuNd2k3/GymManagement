package com.example.gymmanagement.Repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;

import com.example.gymmanagement.entity.Membership;
import com.example.gymmanagement.repository.IMembershipRepository;

@SpringBootTest
public class MembershipRepositoryTest {

    @Autowired
    private IMembershipRepository membershipRepository;

    private Membership membership;

    @BeforeEach
    public void setUp() {
        // Initialize test data before each test method test
        membership = new Membership();
        membership.setName("Ronaldo Siuuuu");
        membership.setPrice(100);
        membership.setPeriod(30);
        membership.setNumbersOfTrainingPerWeek(5);
        membershipRepository.save(membership);
    }

    @AfterEach
    public void tearDown() {
        // Release test data after each test method
        membershipRepository.delete(membership);

    }

    @Test
    public void testSaveMembership_Success() {

        Membership savedMembership = membershipRepository.save(membership);

        // Then
        assertNotNull(savedMembership);
        assertEquals(membership.getName(), savedMembership.getName());
        assertEquals(membership.getPrice(), savedMembership.getPrice());
        assertEquals(membership.getPeriod(), savedMembership.getPeriod());
        assertEquals(membership.getNumbersOfTrainingPerWeek(), savedMembership.getNumbersOfTrainingPerWeek());

    }

    @Test
    void test_whenSaved_thenCanBeFoundById() {
        Membership savedMembership = membershipRepository.findById(membership.getId())
                .orElse(null);

        assertNotNull(savedMembership);
        assertEquals(membership.getName(), savedMembership.getName());
        assertEquals(membership.getPrice(), savedMembership.getPrice());
        assertEquals(membership.getPeriod(), savedMembership.getPeriod());
        assertEquals(membership.getNumbersOfTrainingPerWeek(), savedMembership.getNumbersOfTrainingPerWeek());
    }

    @Test
    public void test_whenUpdated_thenCanBeFoundByIdWithUpdatedData() {
        membership.setName("Messi Siuuuu");
        membershipRepository.save(membership);

        Membership updatedMembership = membershipRepository.findById(membership.getId())
                .orElse(null);

        assertNotNull(updatedMembership);
        assertEquals(membership.getName(), updatedMembership.getName());
    }
}

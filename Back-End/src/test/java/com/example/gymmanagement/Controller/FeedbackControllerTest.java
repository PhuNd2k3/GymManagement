package com.example.gymmanagement.Controller;

import com.example.gymmanagement.controller.FeedbackController;
import com.example.gymmanagement.converter.FeedbackConverter;
import com.example.gymmanagement.dto.FeedbackDTO;
import com.example.gymmanagement.entity.Feedback;
import com.example.gymmanagement.service.IFeedbackService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class FeedbackControllerTest {
    private MockMvc mockMvc;
    @Autowired
    private FeedbackConverter feedbackConverter;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Mock
    private IFeedbackService feedbackService;

    @InjectMocks
    private FeedbackController feedbackController;

    private FeedbackDTO mockFeedbackRequest() {
        return new FeedbackDTO(
                1,
                1,
                1,
                "Good Service");
    }

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testSendFeedback_Success() throws Exception {
        FeedbackDTO mockRequest = mockFeedbackRequest();

        Feedback mockResponse = feedbackConverter.toFeedback(mockRequest);

        when(feedbackService.sendFeedback(any(FeedbackDTO.class))).thenReturn(mockResponse);

        mockMvc.perform(
                        post("/feedback/send")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(new ObjectMapper().writeValueAsString(mockRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string("Successful send feedback: " + mockResponse.getFeedbackDetail()));
    }

    @Test
    public void testSendFeedback_BlankFeedbackDetail() throws Exception {
        FeedbackDTO mockRequest = mockFeedbackRequest();
        mockRequest.setFeedbackDetail("");

        mockMvc.perform(
                        post("/feedback/send")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(new ObjectMapper().writeValueAsString(mockRequest)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }
}

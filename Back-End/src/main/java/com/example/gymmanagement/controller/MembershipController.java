package com.example.gymmanagement.controller;


import com.example.gymmanagement.dto.MembershipDTO;
import com.example.gymmanagement.service.IMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/membership")
public class MembershipController {

    @Autowired
    private IMembershipService membershipService;
    @GetMapping(value = "/{id}")
    public void getMembership(@PathVariable Long id){
        membershipService.getMembershipDetail(id);
    }
}

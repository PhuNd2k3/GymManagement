package com.example.gymmanagement.controller;

import com.example.gymmanagement.dto.MembershipDTO;
import com.example.gymmanagement.entity.Membership;
import com.example.gymmanagement.service.IMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@ResponseBody
@RequestMapping(value = "/membership")
public class MembershipController {

    @Autowired
    private IMembershipService membershipService;

    @GetMapping(value = "/{id}")
    public void getMembership(@PathVariable Long id) {
        membershipService.getMembershipDetail(id);
    }

    @GetMapping(value = "")
    public List<MembershipDTO> getMembership() {
        List<MembershipDTO> result = membershipService.findAll();
        return result;
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Membership> addMembership(@RequestBody Membership newMembership) {
        Membership savedMembership = membershipService.addMembership(newMembership);
        return new ResponseEntity<>(savedMembership, HttpStatus.CREATED);
    }

    @PutMapping(value = "/update")
    public ResponseEntity<Membership> updateMembership(@RequestBody Membership updateMembership) {
        Membership updatedMembership = membershipService.updateMembership(updateMembership);
        return new ResponseEntity<>(updatedMembership, HttpStatus.OK);
    }
}

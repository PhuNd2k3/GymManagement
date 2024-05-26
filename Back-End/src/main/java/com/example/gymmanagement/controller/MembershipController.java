package com.example.gymmanagement.controller;

import com.example.gymmanagement.dto.MembershipDTO;
import com.example.gymmanagement.entity.Membership;
import com.example.gymmanagement.repository.IMembershipRepository;
import com.example.gymmanagement.service.IMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/membership")
public class MembershipController {

    @Autowired
    private IMembershipService membershipService;

    @Autowired
    private IMembershipRepository membershipRepository;

    @GetMapping(value = "/{id}")
    public void getMembership(@PathVariable Integer id) {
        membershipService.getMembershipDetail(id);
    }

    @GetMapping(value = "")
    public List<MembershipDTO> getMembership() {
        List<MembershipDTO> result = membershipService.findAll();
        return result;
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Membership> create(@RequestBody Membership item) {
        try {
            Membership savedItem = membershipRepository.save(item);
            return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping(value = "/update")
    public ResponseEntity<Membership> update(@RequestBody Membership item) {
        Optional<Membership> existingItemOptional = membershipRepository.findById(item.getId());
        if (existingItemOptional.isPresent()) {
            Membership updatedMembership = membershipRepository.save(item);
            return new ResponseEntity<>(updatedMembership, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id) {
        try {
            membershipService.deleteMembership(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

}

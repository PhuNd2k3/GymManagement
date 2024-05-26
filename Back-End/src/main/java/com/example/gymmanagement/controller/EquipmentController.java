package com.example.gymmanagement.controller;

import com.example.gymmanagement.entity.Equipment;
import com.example.gymmanagement.repository.IEquipmentRepository;
import com.example.gymmanagement.service.IEquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/equipment")

public class EquipmentController {
    @Autowired
    private IEquipmentRepository equipmentRepository;

    @Autowired
    private IEquipmentService equipmentService;

    @GetMapping(value = "/all")
    public ResponseEntity<List<Equipment>> getAll() {
        try {
            List<Equipment> items = new ArrayList<Equipment>();

            equipmentRepository.findAll().forEach(items::add);

            if (items.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Equipment> create(@RequestBody Equipment item) {
        try {
            Equipment savedItem = equipmentRepository.save(item);
            return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Equipment> update(@RequestBody Equipment item) {
        Optional<Equipment> existingItemOptional = equipmentRepository.findById(item.getId());
        if (existingItemOptional.isPresent()) {
            return new ResponseEntity<>(equipmentService.updateEquipment(item), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id) {
        try {
            equipmentService.deleteEquipmentById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

}

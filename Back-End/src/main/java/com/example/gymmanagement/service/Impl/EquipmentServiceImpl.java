package com.example.gymmanagement.service.Impl;

import com.example.gymmanagement.entity.Equipment;
import com.example.gymmanagement.repository.IEquipmentRepository;
import com.example.gymmanagement.service.IEquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipmentServiceImpl implements IEquipmentService {

    @Autowired
    private IEquipmentRepository equipmentRepository;

    @Override
    public Equipment getEquipmentById(Integer id) {
        return equipmentRepository.findById(id).get();
    }

    @Override
    public Equipment addEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    @Override
    public Equipment updateEquipment(Equipment updateEquipment) {
        return equipmentRepository.save(updateEquipment);
    }

    @Override
    public void deleteEquipmentById(Integer id) {
        equipmentRepository.deleteById(id);
    }

}

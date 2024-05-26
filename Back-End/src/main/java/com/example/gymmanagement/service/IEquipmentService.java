package com.example.gymmanagement.service;

import com.example.gymmanagement.entity.Equipment;

public interface IEquipmentService {

    Equipment getEquipmentById(Integer id);

    Equipment addEquipment(Equipment equipment);

    Equipment updateEquipment(Equipment updateEquipment);

    void deleteEquipmentById(Integer id);

}
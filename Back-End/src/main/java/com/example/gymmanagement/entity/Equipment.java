package com.example.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "equipment")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "equipment_name")
    private String equipmentName;

    @Column(name = "equipment_quantity")
    private Integer equipmentQuantity;

    @Column(name = "receipt_date")
    private Date receiptDate;

    @Column(name = "equipment_description")
    private String equipmentDescription;
}

package com.example.gymmanagement.dto.response;

import lombok.Data;

import java.util.LinkedHashMap;
import java.util.Map;

@Data
public class SaleResponse {
    private Map<String,Integer> sales;
    public SaleResponse() {
        this.sales = new LinkedHashMap<>();
    }
}

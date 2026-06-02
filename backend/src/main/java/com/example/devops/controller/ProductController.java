package com.example.app.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/products")
public class ProductController {

    @GetMapping
    public List<Map<String, Object>> getProducts() {
        List<Map<String, Object>> products = new ArrayList<>();

        Map<String, Object> p1 = new HashMap<>();
        p1.put("id", 1);
        p1.put("name", "Laptop");
        p1.put("price", 50000);

        Map<String, Object> p2 = new HashMap<>();
        p2.put("id", 2);
        p2.put("name", "Phone");
        p2.put("price", 20000);

        products.add(p1);
        products.add(p2);

        return products;
    }
}
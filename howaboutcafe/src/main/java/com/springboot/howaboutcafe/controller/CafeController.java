package com.springboot.howaboutcafe.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.howaboutcafe.dto.CafeDTO;
import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.service.CafeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/cafe")
public class CafeController {

    @Autowired
    CafeService cafeService;

    @PostMapping("/register")
    public ResponseDTO registerCafe(@RequestBody CafeDTO cafe) throws Exception {
        ResponseDTO result = cafeService.registerCafe(cafe);
        return result;
    }
}

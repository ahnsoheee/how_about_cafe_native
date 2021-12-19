package com.springboot.howaboutcafe.controller;

import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.ReviewDTO;
import com.springboot.howaboutcafe.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    ReviewService reviewService;

    @PostMapping("")
    public ResponseDTO registerReview(@RequestBody ReviewDTO review) throws Exception {
        ResponseDTO result = reviewService.registerReview(review);
        return result;
    }
}

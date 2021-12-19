package com.springboot.howaboutcafe.controller;

import java.util.List;

import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.ReviewDTO;
import com.springboot.howaboutcafe.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("")
    public List<ReviewDTO> getReview(@RequestParam int cafe_id) throws Exception {
        List<ReviewDTO> result = reviewService.getReview(cafe_id);
        return result;
    }

    @PatchMapping("/delete/{review_id}")
    public ResponseDTO deleteReview(@PathVariable("review_id") int review_id) throws Exception {
        ResponseDTO result = reviewService.deleteReview(review_id);
        return result;
    }
}

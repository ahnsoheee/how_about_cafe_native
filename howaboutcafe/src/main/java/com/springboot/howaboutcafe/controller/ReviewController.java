package com.springboot.howaboutcafe.controller;

import java.util.List;

import com.springboot.howaboutcafe.dto.ReviewDTO;
import com.springboot.howaboutcafe.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> registerReview(@RequestBody ReviewDTO review) throws Exception {
        return reviewService.registerReview(review);
    }

    @PatchMapping("/{review_id}/delete")
    public ResponseEntity<String> deleteReview(@PathVariable("review_id") int review_id) throws Exception {
        return reviewService.deleteReview(review_id);
    }

    @GetMapping("")
    public List<ReviewDTO> getMyReview(@RequestParam String user_id) throws Exception {
        return reviewService.getMyReview(user_id);
    }
}

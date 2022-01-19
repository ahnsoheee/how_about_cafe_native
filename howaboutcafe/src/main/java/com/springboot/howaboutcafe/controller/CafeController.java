package com.springboot.howaboutcafe.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.springboot.howaboutcafe.dto.CafeDTO;
import com.springboot.howaboutcafe.dto.ImageDTO;
import com.springboot.howaboutcafe.dto.ReviewDTO;
import com.springboot.howaboutcafe.service.CafeService;
import com.springboot.howaboutcafe.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/cafe")
public class CafeController {

    @Autowired
    CafeService cafeService;

    @Autowired
    ReviewService reviewService;

    @GetMapping("")
    public List<CafeDTO> getSearchedCafe(@RequestParam("query") String query, @RequestParam("order") String order)
            throws Exception {
        return cafeService.getSearchedCafe(query, order);
    }

    @PostMapping("")
    public ResponseEntity<String> registerCafe(@RequestBody CafeDTO cafe) throws Exception {
        return cafeService.registerCafe(cafe);
    }

    @GetMapping("/top4")
    public List<CafeDTO> getTop4Cafe() throws Exception {
        return cafeService.getTop4Cafe();
    }

    @GetMapping("/{cafe_id}/review")
    public List<ReviewDTO> getCafeReview(@PathVariable int cafe_id) throws Exception {
        return reviewService.getCafeReview(cafe_id);
    }

    @GetMapping("/{cafe_id}/image")
    public List<ImageDTO> getImage(@PathVariable int cafe_id) throws Exception {
        return reviewService.getImage(cafe_id);
    }
}

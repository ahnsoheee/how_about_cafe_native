package com.springboot.howaboutcafe.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.springboot.howaboutcafe.dto.CafeDTO;
import com.springboot.howaboutcafe.dto.ImageDTO;
import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.ReviewDTO;
import com.springboot.howaboutcafe.service.CafeService;
import com.springboot.howaboutcafe.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
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
        List<CafeDTO> result = cafeService.getSearchedCafe(query, order);
        return result;
    }

    @PostMapping("")
    public ResponseDTO registerCafe(@RequestBody CafeDTO cafe) throws Exception {
        ResponseDTO result = cafeService.registerCafe(cafe);
        return result;
    }

    @GetMapping("/top4")
    public List<CafeDTO> getTop4Cafe() throws Exception {
        List<CafeDTO> result = cafeService.getTop4Cafe();
        return result;
    }

    @GetMapping("/{cafe_id}/review")
    public List<ReviewDTO> getCafeReview(@PathVariable int cafe_id) throws Exception {
        List<ReviewDTO> result = reviewService.getCafeReview(cafe_id);
        return result;
    }

    @GetMapping("/{cafe_id}/image")
    public List<ImageDTO> getImage(@PathVariable int cafe_id) throws Exception {
        List<ImageDTO> result = reviewService.getImage(cafe_id);
        return result;
    }
}

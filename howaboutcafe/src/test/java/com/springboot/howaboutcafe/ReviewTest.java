package com.springboot.howaboutcafe;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.springboot.howaboutcafe.dto.ReviewDTO;
import com.springboot.howaboutcafe.exception.InvalidException;
import com.springboot.howaboutcafe.service.ReviewService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

@SpringBootTest
public class ReviewTest {

    @Autowired
    ReviewService reviewService;

    @Test
    public void registerReviewTest() {
        ReviewDTO review = new ReviewDTO();

        review.setCafe_id(1);
        review.setUser_id("test1");
        review.setStar(5);
        review.setImage(
                "https://pcmap.place.naver.com/restaurant/1321337563/photo?entry=pll&from=map&fromNxList=true&fromPanelNum=2&ts=1642609797172&filterType=%EC%97%85%EC%B2%B4%EC%82%AC%EC%A7%84#");
        review.setContent("도넛 맛있어요!!");
        ResponseEntity<String> result = reviewService.registerReview(review);
        assertEquals(200, result.getStatusCodeValue());
    }

    @Test
    public void registerReviewFailTest() {
        // 별점 선택 x
        boolean result = false;
        ReviewDTO review = new ReviewDTO();

        review.setCafe_id(1);
        review.setUser_id("test1");
        review.setStar(0);
        review.setImage(
                "https://pcmap.place.naver.com/restaurant/1321337563/photo?entry=pll&from=map&fromNxList=true&fromPanelNum=2&ts=1642609797172&filterType=%EC%97%85%EC%B2%B4%EC%82%AC%EC%A7%84#");
        review.setContent("도넛 맛있어요!!");
        try {
            ResponseEntity<String> res = reviewService.registerReview(review);
        } catch (InvalidException e) {
            result = true;
        }
        assertTrue(result);
    }
}

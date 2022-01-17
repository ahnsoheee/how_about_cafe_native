package com.springboot.howaboutcafe.service;

import java.util.List;

import com.springboot.howaboutcafe.dto.ImageDTO;
import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.ReviewDTO;
import com.springboot.howaboutcafe.mapper.ReviewMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    ReviewMapper reviewMapper;

    // Main method

    public ResponseEntity<ResponseDTO> registerReview(ReviewDTO review) {
        try {
            if (review.getStar() == 0) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseDTO(false, "별점을 선택해 주세요"));
            } else if (review.getContent().equals("")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseDTO(false, "리뷰를 입력해 주세요"));
            } else {
                if (review.getImage().equals(""))
                    review.setImage(null);
                int result = reviewMapper.insertReview(review);
                if (result == 1) {
                    return ResponseEntity.ok().body(new ResponseDTO(true, "리뷰 등록이 완료되었습니다."));
                }
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ResponseDTO(false, "리뷰 등록에 실패했습니다"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(false, "리뷰 등록에 실패했습니다"));
        }
    }

    public List<ReviewDTO> getCafeReview(int cafe_id) {
        List<ReviewDTO> result = reviewMapper.findByCafe(cafe_id);
        return result;
    }

    public List<ImageDTO> getImage(int cafe_id) {
        List<ImageDTO> result = reviewMapper.getImage(cafe_id);
        return result;
    }

    public ResponseEntity<ResponseDTO> deleteReview(int review_id) {
        int result = reviewMapper.deleteReview(review_id);
        if (result == 1) {
            return ResponseEntity.ok().body(new ResponseDTO(true, "삭제되었습니다"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(false, "삭제되지 않았습니다."));

    }

    public List<ReviewDTO> getMyReview(String user_id) {
        List<ReviewDTO> result = reviewMapper.findByUser(user_id);
        return result;
    }
}

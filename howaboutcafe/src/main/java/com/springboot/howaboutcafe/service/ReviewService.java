package com.springboot.howaboutcafe.service;

import java.util.List;

import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.ReviewDTO;
import com.springboot.howaboutcafe.mapper.ReviewMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    ReviewMapper reviewMapper;

    // Main method

    public ResponseDTO registerReview(ReviewDTO review) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            int result = reviewMapper.insertReview(review);
            if (result == 1) {
                responseDTO.setStatus(true);
                responseDTO.setResult("리뷰 등록이 완료되었습니다.");
            } else {
                responseDTO.setResult("리뷰 등록에 실패했습니다");
            }
            return responseDTO;
        } catch (Exception e) {
            return responseDTO;
        }
    }

    public List<ReviewDTO> getCafeReview(int cafe_id) {
        List<ReviewDTO> result = reviewMapper.findByCafe(cafe_id);
        return result;
    }

    public ResponseDTO deleteReview(int review_id) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            int result = reviewMapper.deleteReview(review_id);
            if (result == 1) {
                responseDTO.setStatus(true);
                responseDTO.setResult("삭제되었습니다.");
            } else {
                responseDTO.setResult("삭제되지 않았습니다.");
            }
            return responseDTO;
        } catch (Exception e) {
            return responseDTO;
        }
    }
}

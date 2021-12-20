package com.springboot.howaboutcafe.service;

import java.util.List;

import com.springboot.howaboutcafe.dto.ImageDTO;
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
            int review_id = review.getReview_id();
            int cafe_id = review.getCafe_id();

            if (result == 1) {
                if (review.getImage().size() != 0) {
                    ImageDTO image = new ImageDTO();
                    image.setReview_id(review_id);
                    image.setCafe_id(cafe_id);

                    for (String path : review.getImage()) {
                        image.setPath(path);
                        int tmp = reviewMapper.insertImage(image);
                        System.out.println(tmp);
                        System.out.println(path);
                    }
                }
                responseDTO.setStatus(true);
                responseDTO.setResult("리뷰 등록이 완료되었습니다.");
            } else {
                responseDTO.setResult("리뷰 등록에 실패했습니다");
            }
            return responseDTO;
        } catch (Exception e) {
            System.out.println(e);
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

    public List<ReviewDTO> getMyReview(String user_id) {
        List<ReviewDTO> result = reviewMapper.findByUser(user_id);
        return result;
    }
}

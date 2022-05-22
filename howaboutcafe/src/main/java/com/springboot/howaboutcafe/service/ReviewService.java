package com.springboot.howaboutcafe.service;

import java.util.List;

import com.springboot.howaboutcafe.dto.ImageDTO;
import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.ReviewDTO;
import com.springboot.howaboutcafe.exception.ForbiddenException;
import com.springboot.howaboutcafe.exception.InternalServerException;
import com.springboot.howaboutcafe.exception.InvalidException;
import com.springboot.howaboutcafe.mapper.ReviewMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    ReviewMapper reviewMapper;

    // Main method

    public ResponseEntity<ResponseDTO> registerReview(ReviewDTO review) {
        if (review == null)
            throw new InvalidException("별점과 리뷰를 입력해주세요.");

        if (review.getStar() == 0)
            throw new InvalidException("별점을 선택해 주세요.");

        if (review.getContent().equals(""))
            throw new InvalidException("리뷰를 입력해 주세요.");

        if (review.getImage().equals(""))
            review.setImage(null);

        int result = reviewMapper.insertReview(review);
        if (result == 1)
            return ResponseEntity.ok().body(new ResponseDTO("리뷰 등록이 완료되었습니다."));

        throw new InternalServerException("리뷰 등록에 실패했습니다.");
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
        if (result == 1)
            return ResponseEntity.ok().body(new ResponseDTO("삭제되었습니다"));

        throw new InternalServerException("삭제되지 않았습니다.");

    }

    public ResponseEntity<ResponseDTO> editReview(ReviewDTO review) {
        int isPossibleEdit = reviewMapper.validateDate(review.getReview_id());
        if (isPossibleEdit == 1) {
            int result = reviewMapper.editReview(review);
            if (result == 1)
                return ResponseEntity.ok().body(new ResponseDTO("수정되었습니다"));
            throw new InternalServerException("7일 이내 작성한 리뷰만 가능합니다.");
        }
        throw new ForbiddenException("7일 이내 작성한 리뷰만 가능합니다.");
    }

    public ReviewDTO getReview(int review_id) {
        return reviewMapper.findByReviewId(review_id);
    }

    public List<ReviewDTO> getMyReview(String user_id) {
        List<ReviewDTO> result = reviewMapper.findByUser(user_id);
        return result;
    }
}

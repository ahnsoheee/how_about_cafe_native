package com.springboot.howaboutcafe.mapper;

import java.util.List;

import com.springboot.howaboutcafe.dto.ReviewDTO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReviewMapper {
    int insertReview(ReviewDTO review);

    List<ReviewDTO> findByCafe(int cafe_id);

    int deleteReview(int review_id);
}
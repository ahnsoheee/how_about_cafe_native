package com.springboot.howaboutcafe.mapper;

import com.springboot.howaboutcafe.dto.ReviewDTO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReviewMapper {
    int insertReview(ReviewDTO review);
}
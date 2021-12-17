package com.springboot.howaboutcafe.mapper;

import com.springboot.howaboutcafe.dto.CafeDTO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CafeMapper {
    int isExistCafe(String addr);

    int insertCafe(CafeDTO cafeDTO);
}

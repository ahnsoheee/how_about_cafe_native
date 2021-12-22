package com.springboot.howaboutcafe.mapper;

import com.springboot.howaboutcafe.dto.CafeDTO;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface CafeMapper {
    int isExistCafe(String addr_road);

    int insertCafe(CafeDTO cafeDTO);

    List<CafeDTO> getTop4Cafe();

    List<CafeDTO> getSearchedCafe(String query, String order);
}

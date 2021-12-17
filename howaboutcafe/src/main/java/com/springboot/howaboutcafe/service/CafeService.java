package com.springboot.howaboutcafe.service;

import com.springboot.howaboutcafe.dto.CafeDTO;
import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.mapper.CafeMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CafeService {

    @Autowired
    CafeMapper cafeMapper;

    // Main method

    public ResponseDTO registerCafe(CafeDTO cafe) {
        ResponseDTO responseDTO = new ResponseDTO();
        cafe.setCafe_name(cafe.getCafe_name().trim());
        cafe.setAddr(cafe.getAddr().trim().toUpperCase());
        try {
            int isExistCafe = cafeMapper.isExistCafe(cafe.getAddr());
            if (isExistCafe == 1) {
                responseDTO.setResult("이미 존재하는 카페입니다.");
                return responseDTO;
            }
            int result = cafeMapper.insertCafe(cafe);
            if (result == 1) {
                responseDTO.setStatus(true);
                responseDTO.setResult("카페 등록이 완료되었습니다.");
                return responseDTO;
            }
            responseDTO.setResult("카페 등록에 실패했습니다.");
            return responseDTO;
        } catch (Exception e) {
            // 에러 처리
            return responseDTO;
        }
    }

}

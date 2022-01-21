package com.springboot.howaboutcafe.service;

import java.util.List;

import com.springboot.howaboutcafe.dto.CafeDTO;
import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.exception.DuplicateException;
import com.springboot.howaboutcafe.exception.InternalServerException;
import com.springboot.howaboutcafe.exception.InvalidException;
import com.springboot.howaboutcafe.mapper.CafeMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CafeService {

    @Autowired
    CafeMapper cafeMapper;

    // Main method

    public List<CafeDTO> getSearchedCafe(String query, String order) {
        if (!order.equals("cafe_name"))
            order += " DESC";
        List<CafeDTO> result = cafeMapper.getSearchedCafe(query, order);
        return result;
    }

    public ResponseEntity<ResponseDTO> registerCafe(CafeDTO cafe) {
        if (cafe == null)
            throw new InvalidException("이름과 주소를 모두 입력해주세요.");

        cafe.setCafe_name(cafe.getCafe_name().trim());
        cafe.setAddr_road(cafe.getAddr_road().trim().toUpperCase());
        cafe.setAddr_jibun(cafe.getAddr_jibun().trim().toUpperCase());
        if (cafe.getCafe_name().equals("") || cafe.getAddr_jibun().equals("") || cafe.getAddr_road().equals(""))
            throw new InvalidException("이름과 주소를 모두 입력해주세요.");

        int isExistCafe = cafeMapper.isExistCafe(cafe.getAddr_road());
        if (isExistCafe == 1)
            throw new DuplicateException("이미 존재하는 카페입니다.");

        int result = cafeMapper.insertCafe(cafe);
        if (result == 1)
            return ResponseEntity.ok().body(new ResponseDTO("카페 등록이 완료되었습니다."));

        throw new InternalServerException("카페 등록에 실패했습니다.");
    }

    public List<CafeDTO> getTop4Cafe() {
        List<CafeDTO> result = cafeMapper.getTop4Cafe();
        return result;
    }
}

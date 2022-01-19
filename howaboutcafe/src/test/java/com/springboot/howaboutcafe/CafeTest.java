package com.springboot.howaboutcafe;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.springboot.howaboutcafe.dto.CafeDTO;
import com.springboot.howaboutcafe.service.CafeService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

@SpringBootTest
public class CafeTest {

    @Autowired
    CafeService cafeService;

    @Test
    public void registerCafeTest() {
        CafeDTO cafe = new CafeDTO();
        cafe.setCafe_name("하프커피");
        cafe.setAddr_road("서울 성동구 서울숲4길 12 1층");
        cafe.setAddr_jibun("서울 성동구 성수동1가 668-88 1층");
        ResponseEntity<String> result = cafeService.registerCafe(cafe);

        assertEquals(200, result.getStatusCodeValue());
    }
}

package com.springboot.howaboutcafe.dto;

import lombok.Getter;

@Getter
public class ResponseDTO {
    String msg;

    public ResponseDTO(String msg) {
        this.msg = msg;
    }
}

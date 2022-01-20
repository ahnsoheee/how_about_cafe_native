package com.springboot.howaboutcafe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseDTO {
    private int status = 200;
    private String message;

    public ResponseDTO(String message) {
        this.message = message;
    }
}
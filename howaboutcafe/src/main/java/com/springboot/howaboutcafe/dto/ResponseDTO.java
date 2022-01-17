package com.springboot.howaboutcafe.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ResponseDTO {
    private boolean status;
    private String result;

    public ResponseDTO(boolean status, String result) {
        this.status = status;
        this.result = result;
    }
}

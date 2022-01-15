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

    ResponseDTO(String result) {
        this.status = true;
        this.result = result;
    }
}

package com.springboot.howaboutcafe.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ResponseDTO {
    boolean status;
    String result;

    public ResponseDTO() {
        this.status = false;
    }
}

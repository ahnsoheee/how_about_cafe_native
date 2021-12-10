package com.springboot.howaboutcafe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseDTO {
    boolean status;
    String msg;

    public ResponseDTO() {
        this.status = false;
    }
}

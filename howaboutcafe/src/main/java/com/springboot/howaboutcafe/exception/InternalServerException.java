package com.springboot.howaboutcafe.exception;

import lombok.Getter;

@Getter
public class InternalServerException extends RuntimeException {

    private ErrorCode errorCode;

    public InternalServerException(String message) {
        super(message);
        this.errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
    }
}

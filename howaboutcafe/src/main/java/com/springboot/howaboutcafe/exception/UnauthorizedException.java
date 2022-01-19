package com.springboot.howaboutcafe.exception;

import lombok.Getter;

@Getter
public class UnauthorizedException extends RuntimeException {

    private ErrorCode errorCode;

    public UnauthorizedException(String message) {
        super(message);
        this.errorCode = ErrorCode.UNAUTHORIZED;
    }
}

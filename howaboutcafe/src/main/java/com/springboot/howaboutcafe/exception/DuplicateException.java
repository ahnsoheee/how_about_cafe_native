package com.springboot.howaboutcafe.exception;

import lombok.Getter;

@Getter
public class DuplicateException extends RuntimeException {

    private ErrorCode errorCode;

    public DuplicateException(String message) {
        super(message);
        this.errorCode = ErrorCode.CONFLICT;
    }
}

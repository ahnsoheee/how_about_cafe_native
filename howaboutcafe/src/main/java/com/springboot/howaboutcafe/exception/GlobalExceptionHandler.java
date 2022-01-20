package com.springboot.howaboutcafe.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateException(DuplicateException e) {
        return new ResponseEntity<>(new ErrorResponse(e.getErrorCode(), e.getMessage()),
                HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorResponse> handleForbiddenException(ForbiddenException e) {
        return new ResponseEntity<>(new ErrorResponse(e.getErrorCode(), e.getMessage()),
                HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(InternalServerException.class)
    public ResponseEntity<ErrorResponse> handleInternalServerException(InternalServerException e) {
        return new ResponseEntity<>(new ErrorResponse(e.getErrorCode(), e.getMessage()),
                HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(InvalidException.class)
    public ResponseEntity<ErrorResponse> handleInvalidException(InvalidException e) {
        return new ResponseEntity<>(new ErrorResponse(e.getErrorCode(), e.getMessage()),
                HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException e) {
        return new ResponseEntity<>(new ErrorResponse(e.getErrorCode(), e.getMessage()),
                HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(UnauthorizedException e) {
        return new ResponseEntity<>(new ErrorResponse(e.getErrorCode(), e.getMessage()),
                HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        return new ResponseEntity<>(
                new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR, "Internal Server Error"),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

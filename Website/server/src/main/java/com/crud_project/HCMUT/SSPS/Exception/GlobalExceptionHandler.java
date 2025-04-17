package com.crud_project.HCMUT.SSPS.Exception;

import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    ResponseEntity<SSPSExceptionHandler> handleNotFound (NotFoundException exc) {
        SSPSExceptionHandler error = new SSPSExceptionHandler();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(System.currentTimeMillis());
        return new ResponseEntity<SSPSExceptionHandler>(error,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    ResponseEntity<SSPSExceptionHandler> handleBadRequest (BadRequestException exc) {
        SSPSExceptionHandler error = new SSPSExceptionHandler();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(System.currentTimeMillis());
        return new ResponseEntity<SSPSExceptionHandler>(error,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<SSPSExceptionHandler> handleValidationException (MethodArgumentNotValidException exc) {
        SSPSExceptionHandler error = new SSPSExceptionHandler();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(System.currentTimeMillis());
        return new ResponseEntity<SSPSExceptionHandler>(error,HttpStatus.BAD_REQUEST);
    }

}

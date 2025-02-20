package com.berezovskoye.exceptions.handlers;

import com.berezovskoye.exceptions.global.BadRequestException;
import com.berezovskoye.exceptions.models.TpuErrorResponse;
import com.berezovskoye.exceptions.users.BadCredentialsException;
import com.berezovskoye.exceptions.product.ProductNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<TpuErrorResponse> handleProductNotFound(ProductNotFoundException ex) {
       TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<TpuErrorResponse> handleBadCredentials(BadCredentialsException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<TpuErrorResponse> handleBadRequest(BadRequestException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<TpuErrorResponse> handleUsernameNotFound(UsernameNotFoundException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnsupportedEncodingException.class)
    public ResponseEntity<TpuErrorResponse> handleUnsupportedEncoding(UnsupportedEncodingException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<TpuErrorResponse> handleIOException(IOException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<TpuErrorResponse> handleIllegalState(IllegalStateException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

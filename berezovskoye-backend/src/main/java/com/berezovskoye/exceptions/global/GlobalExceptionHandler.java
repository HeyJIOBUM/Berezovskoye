package com.berezovskoye.exceptions.global;

import com.berezovskoye.exceptions.product.BadCredentialsException;
import com.berezovskoye.exceptions.product.ProductNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

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
}

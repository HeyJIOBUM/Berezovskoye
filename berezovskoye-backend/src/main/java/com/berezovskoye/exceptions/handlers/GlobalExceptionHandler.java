package com.berezovskoye.exceptions.handlers;

import com.berezovskoye.exceptions.errors.database.EntityAbnormalBehaviorException;
import com.berezovskoye.exceptions.errors.database.EntityNotFoundException;
import com.berezovskoye.exceptions.errors.global.BadRequestException;
import com.berezovskoye.exceptions.models.TpuErrorResponse;
import com.berezovskoye.exceptions.errors.authorization.BadCredentialsException;
import jakarta.persistence.PersistenceException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

@ControllerAdvice
public class GlobalExceptionHandler {

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

    @ExceptionHandler(UnsupportedEncodingException.class)
    public ResponseEntity<TpuErrorResponse> handleUnsupportedEncoding(UnsupportedEncodingException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<TpuErrorResponse> handleEntityNotFound(EntityNotFoundException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EntityAbnormalBehaviorException.class)
    public ResponseEntity<TpuErrorResponse> handleEntityAbnormalBehavior(EntityAbnormalBehaviorException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
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

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<TpuErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    //JPA exceptions

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<TpuErrorResponse> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ObjectOptimisticLockingFailureException.class)
    public ResponseEntity<TpuErrorResponse> handleOptimisticLocking(ObjectOptimisticLockingFailureException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(PersistenceException.class)
    public ResponseEntity<TpuErrorResponse> handlePersistenceException(PersistenceException ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse(ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //  Everything else
    @ExceptionHandler(Exception.class)
    public ResponseEntity<TpuErrorResponse> handleGenericException(Exception ex) {
        TpuErrorResponse errorResponse = new TpuErrorResponse("An unexpected error occurred: " + ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

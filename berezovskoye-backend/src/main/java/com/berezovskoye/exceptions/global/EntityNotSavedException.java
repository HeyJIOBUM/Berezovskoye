package com.berezovskoye.exceptions.global;

public class EntityNotSavedException extends RuntimeException {
    public EntityNotSavedException(String message) {
        super(message);
    }
}

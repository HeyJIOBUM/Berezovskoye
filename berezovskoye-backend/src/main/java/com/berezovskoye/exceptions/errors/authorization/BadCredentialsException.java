package com.berezovskoye.exceptions.errors.authorization;

public class BadCredentialsException extends RuntimeException {
    public BadCredentialsException(String message) {
        super(message);
    }
}

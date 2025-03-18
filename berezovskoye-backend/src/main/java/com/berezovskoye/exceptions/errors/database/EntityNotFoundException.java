package com.berezovskoye.exceptions.errors.database;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ResourceBundle;

@Slf4j
public class EntityNotFoundException extends RuntimeException {

    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public EntityNotFoundException(String message) {
        super(message);
    }

    public static EntityNotFoundException throwAndLogNotFound(String MODEL_NAME, String primaryKey){
        String notFound = messages.getString("entity.not.found");
        String notFoundMessage = String.format(notFound, MODEL_NAME, primaryKey);
        log.error("{}{}", notFoundMessage, LocalDateTime.now());
        throw new EntityNotFoundException(notFoundMessage);
    }
}

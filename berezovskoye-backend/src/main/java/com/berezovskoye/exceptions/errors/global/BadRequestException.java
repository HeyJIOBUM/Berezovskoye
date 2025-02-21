package com.berezovskoye.exceptions.errors.global;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ResourceBundle;

@Slf4j
@Component
public class BadRequestException extends RuntimeException {

    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public BadRequestException(String message) {super(message);}

    public static void checkObject(String messageKey, Object ...objects){
        for(Object object : objects){
            if(object == null){
                String errorMessage = messages.getString(messageKey);
                log.error("{}{}", errorMessage, LocalDateTime.now());
                throw new BadRequestException(errorMessage);
            }
        }
    }

    public static BadRequestException throwAndLogBadRequest(String key, String MODEL_NAME){
        String exist = messages.getString(key);
        String existMessage = String.format(exist, MODEL_NAME);
        log.info("{} {}", existMessage, LocalDateTime.now());
        throw new BadRequestException(existMessage);
    }
}

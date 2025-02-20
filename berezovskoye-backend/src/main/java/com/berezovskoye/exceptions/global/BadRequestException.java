package com.berezovskoye.exceptions.global;

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
}

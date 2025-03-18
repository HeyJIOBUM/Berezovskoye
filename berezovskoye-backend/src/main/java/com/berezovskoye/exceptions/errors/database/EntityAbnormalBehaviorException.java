package com.berezovskoye.exceptions.errors.database;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ResourceBundle;

@Slf4j
public class EntityAbnormalBehaviorException extends RuntimeException {

    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public EntityAbnormalBehaviorException(String message) {
        super(message);
    }

    public static EntityNotFoundException throwAndLogNotDeleted(String MODEL_NAME, Integer id){
        String notDeleted = messages.getString("entity.not.deleted");
        String notDeletedMessage = String.format(notDeleted, MODEL_NAME, id);
        log.error(notDeletedMessage);
        throw new EntityAbnormalBehaviorException(notDeletedMessage);
    }
}

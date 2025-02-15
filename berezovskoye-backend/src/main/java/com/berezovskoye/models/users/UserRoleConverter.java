package com.berezovskoye.models.users;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class UserRoleConverter implements AttributeConverter<UserRole, String> {

    @Override
    public String convertToDatabaseColumn(UserRole role) {
        if (role == null) {
            return null;
        }
        return role.toString();
    }

    @Override
    public UserRole convertToEntityAttribute(String role) {
        if (role == null) {
            return null;
        }
        return UserRole.valueOf(role);
    }
}

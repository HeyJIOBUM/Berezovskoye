package com.berezovskoye.models.users;

public enum UserRole {
    ADMIN("ADMIN"),
    DATA_PROVIDER("DATA_PROVIDER");

    final private String role;

    UserRole(String role){
        this.role = role;
    }

    @Override
    public String toString(){
        return role;
    }
}

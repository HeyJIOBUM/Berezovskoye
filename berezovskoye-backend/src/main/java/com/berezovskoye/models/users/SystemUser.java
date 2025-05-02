package com.berezovskoye.models.users;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "\"superusers\"")
public class SystemUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    @Convert(converter = UserRoleConverter.class)
    private UserRole role;

    @Column(nullable = false)
    private String login;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean isEnabled = true;

    public boolean isCorrect(){
        return login != null
                && password != null;
    }
}

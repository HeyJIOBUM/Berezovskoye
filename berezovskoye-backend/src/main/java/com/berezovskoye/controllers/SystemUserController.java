package com.berezovskoye.controllers;

import com.berezovskoye.models.users.SystemUser;
import com.berezovskoye.principals.SystemUserPrincipal;
import com.berezovskoye.services.SystemUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SystemUserController {
    @Autowired
    private SystemUserService userService;

    @PostMapping("/register")
    public ResponseEntity<SystemUser> register(@RequestBody SystemUser user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody SystemUser user){
        return userService.verify(user);
    }

    @PutMapping("/change-credentials")
    public ResponseEntity<String> changeCredentials(
            @AuthenticationPrincipal SystemUserPrincipal userDetails,
            @RequestBody SystemUser newData){

        return userService.changeCredentials(userDetails, newData);

    }

}

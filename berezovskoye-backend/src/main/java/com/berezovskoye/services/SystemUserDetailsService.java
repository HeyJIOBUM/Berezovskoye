package com.berezovskoye.services;

import com.berezovskoye.exceptions.global.BadRequestException;
import com.berezovskoye.models.users.SystemUser;
import com.berezovskoye.principals.SystemUserPrincipal;
import com.berezovskoye.repositories.SystemUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ResourceBundle;

@Slf4j
@Service
public class SystemUserDetailsService implements UserDetailsService {
    @Autowired
    private SystemUserRepository userRepository;

    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        BadRequestException.checkObject("default.bad.request", login);

        SystemUser user = userRepository.findByLogin(login);

        if(user == null){
            System.out.println("User not found");//TODO
            throw new UsernameNotFoundException("User not found");
        }
        return new SystemUserPrincipal(user);
    }
}
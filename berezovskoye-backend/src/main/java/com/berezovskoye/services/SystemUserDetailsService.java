package com.berezovskoye.services;

import com.berezovskoye.models.users.SystemUser;
import com.berezovskoye.principals.SystemUserPrincipal;
import com.berezovskoye.repositories.SystemUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SystemUserDetailsService implements UserDetailsService {
    @Autowired
    private SystemUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        SystemUser user = userRepository.findByLogin(login);

        if(user == null){
            System.out.println("User not found");
            throw new UsernameNotFoundException("User not found");
        }
        return new SystemUserPrincipal(user);
    }
}
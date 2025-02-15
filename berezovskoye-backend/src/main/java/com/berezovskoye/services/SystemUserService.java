package com.berezovskoye.services;

import com.berezovskoye.exceptions.product.BadCredentialsException;
import com.berezovskoye.models.users.SystemUser;
import com.berezovskoye.repositories.SystemUserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.ResourceBundle;

@Service
public class SystemUserService {

    @Value("${encoding.strength}")
    private int encodingStrength;

    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private SystemUserRepository userRepository;

    private BCryptPasswordEncoder encoder;

    @PostConstruct
    public void init() {
        encoder = new BCryptPasswordEncoder(encodingStrength);
    }

    public ResponseEntity<SystemUser> register(SystemUser user){
        //SystemUser.isCorrect(user); //TODO boolean check + logs and error
        user.setPassword(encoder.encode(user.getPassword()));

        return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
    }

    public ResponseEntity<String> verify(SystemUser user) {
        Authentication authentication = manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getLogin(), user.getPassword())
        );

        if(!authentication.isAuthenticated()){
            String errorMessage = messages.getString("user.bad.credentials");
            throw new BadCredentialsException(errorMessage);
        }

        return new ResponseEntity<>(jwtService.generateToken(user.getLogin()), HttpStatus.OK);
    }
}

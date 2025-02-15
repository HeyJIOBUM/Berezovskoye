package com.berezovskoye.services;

import com.berezovskoye.exceptions.product.BadCredentialsException;
import com.berezovskoye.models.users.SystemUser;
import com.berezovskoye.principals.SystemUserPrincipal;
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

import java.util.Optional;
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

    public ResponseEntity<String> changeCredentials(SystemUserPrincipal userDetails, SystemUser newData){
        SystemUser existingUser = userRepository.findByLogin(userDetails.getUsername());
        if(!existingUser.isEnabled()){
            //TODO handle error + log
        }

        updateUserFields(existingUser, newData);
        userRepository.save(existingUser);

        return new ResponseEntity<>(jwtService.generateToken(newData.getLogin()), HttpStatus.OK);
    }

    private void updateUserFields(SystemUser existingUser, SystemUser newData) {
        Optional.ofNullable(newData.getRole()).ifPresent(existingUser::setRole);
        Optional.ofNullable(newData.getLogin()).ifPresent(existingUser::setLogin);

        if (newData.getPassword() != null) {
            existingUser.setPassword(encoder.encode(newData.getPassword()));
        }
        existingUser.setEnabled(newData.isEnabled());
    }

    public ResponseEntity<String> deleteUser(SystemUserPrincipal userDetails){
        SystemUser userToDelete = userRepository.findByLogin(userDetails.getUsername());
        //TODO handle missing user + logs
        userRepository.delete(userToDelete);
        return new ResponseEntity<>("Success", HttpStatus.OK); // TODO get message from .properties
    }

}

package com.berezovskoye.services;

import com.berezovskoye.exceptions.errors.global.BadRequestException;
import com.berezovskoye.exceptions.errors.authorization.BadCredentialsException;
import com.berezovskoye.models.users.SystemUser;
import com.berezovskoye.models.users.UserRole;
import com.berezovskoye.principals.SystemUserPrincipal;
import com.berezovskoye.repositories.SystemUserRepository;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.ResourceBundle;

@Slf4j
@Service
public class SystemUserService {

    @Value("${encoding.strength}")
    private int encodingStrength;

    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Value("${user.name}")
    private String adminName;
    @Value("${user.password}")
    private String adminPassword;

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
        createSuperAdmin();
    }

    public ResponseEntity<SystemUser> register(SystemUser user){
        if(user == null || !user.isCorrect()){
            String userIncorrect = messages.getString("user.incorrect");
            log.error("{}{}", userIncorrect, LocalDateTime.now());
            throw new BadRequestException(userIncorrect);
        }
        user.setPassword(encoder.encode(user.getPassword()));

        SystemUser userInDb = userRepository.findByLogin(user.getLogin());

        if(userInDb == null){
            userInDb = userRepository.save(user);
        }

        return new ResponseEntity<>(userInDb, HttpStatus.OK);
    }

    public ResponseEntity<String> verify(SystemUser user) {
        if(user == null || !user.isCorrect()){
            String userIncorrect = messages.getString("user.incorrect");
            log.error("{}{}", userIncorrect, LocalDateTime.now());
            throw new BadRequestException(userIncorrect);
        }

        Authentication authentication = manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getLogin(), user.getPassword())
        );

        if(!authentication.isAuthenticated()){
            String userBadCredentials = messages.getString("user.bad.credentials");
            log.error("{}{}", userBadCredentials, LocalDateTime.now());
            throw new BadCredentialsException(userBadCredentials);
        }

        return new ResponseEntity<>(jwtService.generateToken(user.getLogin()), HttpStatus.OK);
    }

    public ResponseEntity<String> changeCredentials(SystemUserPrincipal userDetails, SystemUser newData){
        BadRequestException.checkObject("default.bad.request", userDetails, newData);

        SystemUser existingUser = userRepository.findByLogin(userDetails.getUsername());
        if(!existingUser.isEnabled()){
            String userIncorrect = messages.getString("user.not.enabled");
            log.error("{}{}", userIncorrect, LocalDateTime.now());
            throw new BadCredentialsException(userIncorrect);
        }

        updateUserFields(existingUser, newData);
        userRepository.save(existingUser);

        return new ResponseEntity<>(jwtService.generateToken(newData.getLogin()), HttpStatus.OK);
    }

    private void updateUserFields(SystemUser existingUser, SystemUser newData) {
        BadRequestException.checkObject("default.bad.request", existingUser, newData);

        Optional.ofNullable(newData.getRole()).ifPresent(existingUser::setRole);
        Optional.ofNullable(newData.getLogin()).ifPresent(existingUser::setLogin);

        if (newData.getPassword() != null) {
            existingUser.setPassword(encoder.encode(newData.getPassword()));
        }
        existingUser.setEnabled(newData.isEnabled());
    }

    @Deprecated
    public ResponseEntity<String> deleteUser(SystemUserPrincipal userDetails){
        BadRequestException.checkObject("default.bad.request", userDetails);

        SystemUser userToDelete = userRepository.findByLogin(userDetails.getUsername());

        userRepository.delete(userToDelete);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    private void createSuperAdmin() {
        SystemUser admin = new SystemUser();
        admin.setRole(UserRole.ADMIN);
        admin.setPassword(adminPassword);
        admin.setLogin(adminName);

        register(admin);
    }
}

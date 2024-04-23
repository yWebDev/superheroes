package com.example.superheroes.jwt.controller;

import com.example.superheroes.jwt.model.AuthenticationRequest;
import com.example.superheroes.jwt.model.AuthenticationResponse;
import com.example.superheroes.jwt.service.ApplicationUserDetailsService;
import com.example.superheroes.jwt.util.JwtUtil;
import com.example.superheroes.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthenticationController {

    private JwtUtil jwtTokenUtil;
    private ApplicationUserDetailsService userDetailsService;

    @Autowired
    public void setJwtTokenUtil(JwtUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Autowired
    public void setApplicationUserDetailsService(ApplicationUserDetailsService applicationUserDetailsService) {
        this.userDetailsService = applicationUserDetailsService;
    }

    @RequestMapping(value = "api/v1/authenticate")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthenticationResponse authenticate(@RequestBody AuthenticationRequest req) throws Exception {
        UserEntity user;

        try {
            user = userDetailsService.authenticate(req.getEmail(), req.getPassword());
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        var userDetails = userDetailsService.loadUserByUsername(user.getEmail());

        System.out.println(userDetails);
        var jwt = jwtTokenUtil.generateToken(userDetails);

        return new AuthenticationResponse(jwt);
    }

}

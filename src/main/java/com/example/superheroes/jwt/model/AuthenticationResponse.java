package com.example.superheroes.jwt.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class AuthenticationResponse implements Serializable {

    public AuthenticationResponse(String token) {
        token = token.trim();
    }

    private String token;
}

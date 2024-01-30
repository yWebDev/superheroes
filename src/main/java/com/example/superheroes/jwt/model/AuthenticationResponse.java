package com.example.superheroes.jwt.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
public class AuthenticationResponse implements Serializable {

    public AuthenticationResponse(String token) {
        this.token = token.trim();
    }

    private String token;
}

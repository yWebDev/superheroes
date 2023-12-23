package com.example.superheroes.antiHero.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class AntiHeroDTO {

    private UUID id;

    @NotNull(message = "First Name is required")
    private String firstName;

    private String lastName;
    private String house;
    private String knownAs;

    public UUID getId() {
        return id;
    }

    public @NotNull String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getHouse() {
        return house;
    }

    public String getKnownAs() {
        return knownAs;
    }
}

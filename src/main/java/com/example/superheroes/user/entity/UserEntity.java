package com.example.superheroes.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Setter
@Getter
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "UUID")
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(unique = true)
    private String email;

    private String mobileNumber;
    private byte[] storedHash;
    private byte[] storedSalt;

    public UserEntity() {
    }

    public UserEntity(String email, String mobileNumber) {
        this.email = email;
        this.mobileNumber = mobileNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setStoredSalt(byte[] storedSalt) {
        this.storedSalt = storedSalt;
    }

    public byte[] getStoredSalt() {
        return this.storedSalt;
    }

    public byte[] getStoredHash() {
        return storedHash;
    }

    public void setStoredHash(byte[] storedHash) {
        this.storedHash = storedHash;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
}

package com.example.superheroes.user.repository;

import com.example.superheroes.user.entity.UserEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository underTest;

    @Test
    void itShouldCheckWhenUserEmailExists() {
        // give
        String email = "test@test.com";
        UserEntity user = new UserEntity(email, "2121323232323");

        underTest.save(user);

        // when
        boolean expected = underTest.selectExistsEmail(email);

        // then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldFindUserWhenEmailExists() {
        // give
        String email = "dennis@test.com";
        UserEntity user = new UserEntity(email, "2121323232323");

        underTest.save(user);

        // when
        UserEntity expected = underTest.findByEmail(email);

        // then
        assertThat(expected).isEqualTo(user);
    }
}

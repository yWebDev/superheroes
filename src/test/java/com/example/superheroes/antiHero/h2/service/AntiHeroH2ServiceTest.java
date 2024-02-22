package com.example.superheroes.antiHero.h2.service;

import com.example.superheroes.antiHero.entity.AntiHeroEntity;
import com.example.superheroes.antiHero.repository.AntiHeroRepository;
import com.example.superheroes.antiHero.service.AntiHeroService;
import com.example.superheroes.exception.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
public class AntiHeroH2ServiceTest {

    @Autowired
    private AntiHeroRepository repo;
    private AntiHeroService service;

    @BeforeEach
    public void setup() {
        service = new AntiHeroService(repo);
    }

    @Test
    public void shouldFindAllAntiHero() {
        AntiHeroEntity antiHero = new AntiHeroEntity();
        antiHero.setFirstName("John");
        antiHero.setLastName("Brock");
        antiHero.setHouse("MCU");

        service.addAntiHero(antiHero);

        Iterable<AntiHeroEntity> antiHeroList = service.findAllAntiHeroes();
        AntiHeroEntity savedAntiHero = antiHeroList.iterator().next();

        assertThat(savedAntiHero).isNotNull();
    }

    @Test
    public void shouldAddAntiHero() {
        AntiHeroEntity antiHero = new AntiHeroEntity();
        antiHero.setFirstName("John");
        antiHero.setLastName("Brock");
        antiHero.setHouse("MCU");

        service.addAntiHero(antiHero);

        Iterable<AntiHeroEntity> antiHeroList = service.findAllAntiHeroes();
        AntiHeroEntity savedAntiHero = antiHeroList.iterator().next();

        assertThat(antiHero).isEqualTo(savedAntiHero);
    }

    @Test
    public void shouldUpdateAntiHero() {
        AntiHeroEntity antiHero = new AntiHeroEntity();
        antiHero.setFirstName("John");
        antiHero.setLastName("Brock");
        antiHero.setHouse("MCU");

        AntiHeroEntity savedAntiHero = service.addAntiHero(antiHero);

        savedAntiHero.setHouse("San Francisco");
        service.updateAntiHero(savedAntiHero.getId(), savedAntiHero);

        AntiHeroEntity foundAntiHero = service.findAntiHeroById(savedAntiHero.getId());

        assertThat(foundAntiHero.getHouse()).isEqualTo("San Francisco");
    }

    @Test
    public void shouldDeleteAntiHero() {
        assertThrows(NotFoundException.class, new Executable() {
            @Override
            public void execute() throws Throwable {
                AntiHeroEntity antiHero = new AntiHeroEntity();
                antiHero.setFirstName("John");
                antiHero.setLastName("Brock");
                antiHero.setHouse("MCU");

                AntiHeroEntity savedAntiHero = service.addAntiHero(antiHero);
                service.removeAntiHeroById(savedAntiHero.getId());
                AntiHeroEntity foundAntiHero = service.findAntiHeroById(savedAntiHero.getId());

                assertThat(foundAntiHero).isNull();
            }
        });
    }
}

package com.example.superheroes.antiHero.service;

import com.example.superheroes.antiHero.entity.AntiHeroEntity;
import com.example.superheroes.antiHero.repository.AntiHeroRepository;
import com.example.superheroes.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class AntiHeroService {
    private final AntiHeroRepository repo;

    public Iterable<AntiHeroEntity> findAllAntiHeroes() {
        return repo.findAll();
    }

    public AntiHeroEntity findAntiHeroById(UUID id) {
        return findOrThrow(id);
    }

    public void removeAntiHeroById(UUID id) {
        findOrThrow(id);
        repo.deleteById(id);
    }

    public AntiHeroEntity addAntiHero(AntiHeroEntity entity) {
        return repo.save(entity);
    }

    public void updateAntiHero(UUID id, AntiHeroEntity entity) {
        findOrThrow(id);
        repo.save(entity);
    }

    private AntiHeroEntity findOrThrow(final UUID id) {
        return repo.findById(id).orElseThrow(
                () -> new NotFoundException("Anti-heor by id " + id + " is not found")
        );
    }
}

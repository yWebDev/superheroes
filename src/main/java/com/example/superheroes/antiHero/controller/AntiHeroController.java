package com.example.superheroes.antiHero.controller;

import com.example.superheroes.antiHero.dto.AntiHeroDTO;
import com.example.superheroes.antiHero.entity.AntiHeroEntity;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.superheroes.antiHero.service.AntiHeroService;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/anti-heroes")
public class AntiHeroController {

    private AntiHeroService service;
    private ModelMapper mapper;

    private AntiHeroDTO convertToDto(AntiHeroEntity entity) {
        return mapper.map(entity, AntiHeroDTO.class);
    }

    private AntiHeroEntity convertToEntity(AntiHeroDTO dto) {
        return mapper.map(dto, AntiHeroEntity.class);
    }

    @GetMapping("/{id}")
    public AntiHeroDTO getAntiHeroById(@PathVariable("id") UUID id) {
        return convertToDto(service.findAntiHeroById(id));
    }

    @PostMapping
    public AntiHeroDTO postAntiHero(@Valid @RequestBody AntiHeroDTO dto) {
        var entity = convertToEntity(dto);
        var antiHero = service.addAntiHero(entity);

        return convertToDto(antiHero);
    }

    @PutMapping("/{id}")
    public void putAntiHero(
            @PathVariable("id") UUID id,
            @Valid @RequestBody AntiHeroDTO antiHeroDto
    ) {
        if (!id.equals(antiHeroDto.getId())) throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "id does not match"
        );

        var antiHeroEntity = convertToEntity(antiHeroDto);
        service.updateAntiHero(id, antiHeroEntity);
    }

    @DeleteMapping("/{id}")
    public void deleteAntiHeroById(@PathVariable("id") UUID id) {
        service.removeAntiHeroById(id);
    }

    @GetMapping
    public List<AntiHeroDTO> getAntiHeroes() {
        var antiHeroesList = StreamSupport.stream(service.findAllAntiHeroes().spliterator(), false)
                .collect(Collectors.toList());
        return antiHeroesList
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}

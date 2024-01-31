package com.example.superheroes.antiHero.controller;

import com.example.superheroes.antiHero.dto.AntiHeroDTO;
import com.example.superheroes.antiHero.entity.AntiHeroEntity;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.superheroes.antiHero.service.AntiHeroService;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("api/v1/anti-heroes")
@PreAuthorize("isAuthenticated()")
public class AntiHeroController {

    @Autowired
    private AntiHeroService service;
    private final ModelMapper mapper = new ModelMapper();

    private static final Logger LOGGER = LoggerFactory.getLogger(AntiHeroController.class);

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
    public AntiHeroDTO postAntiHero(@Valid @RequestBody AntiHeroDTO antiHeroDTO) {
        var entity = convertToEntity(antiHeroDTO);
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
    public List<AntiHeroDTO> getAntiHeroes(Pageable pageable) {
        int toSkip = pageable.getPageSize() * pageable.getPageNumber();

        //SLF4J2
        LOGGER.info("Useing SLF4J2: Getting anti hero list - getAntiHeroes()");

        //LOMBOK SLF4j
        log.info("Using SLF4J Lombok: Getting anti hero list - getAntiHeroes()");

        var antiHeroesList = StreamSupport.stream(service.findAllAntiHeroes().spliterator(), false)
                .skip(toSkip)
                .limit(pageable.getPageSize())
                .collect(Collectors.toList());
        return antiHeroesList
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}

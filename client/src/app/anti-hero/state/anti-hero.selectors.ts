import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AntiHeroState } from './anti-hero.reducers';

// select the AntiHeroState
export const selectAntiHeroState = createFeatureSelector<AntiHeroState>('antiHeroState');

// selecting all antiheroes
export const selectAntiHeroes = () => createSelector(selectAntiHeroState, (state: AntiHeroState) => state.antiHeroes)

// selecting an antihero base on id
export const selectAntiHero = (id: string) => createSelector(selectAntiHeroState, (state: AntiHeroState) => state.antiHeroes.find(d => d.id === id))

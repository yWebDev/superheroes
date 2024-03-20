import { createAction, props } from '@ngrx/store';
import { AntiHero } from '../models/anti-hero.interface';

export enum AntiHeroActions {
  GET_ANTI_HERO_LIST = '[Anti-Hero] Get Anti-Hero list',
  SET_ANTI_HERO_LIST = '[Anti-Hero] Set Anti-Hero list',
  REMOVE_ANTI_HERO_API = '[Anti-Hero] Remove Anti-Hero (API)',
  REMOVE_ANTI_HERO_STATE = '[Anti-Hero] Remove Anti-Hero (STATE)',
  ADD_ANTI_HERO_API = '[Anti-Hero] Add Anti-Hero (API)',
  ADD_ANTI_HERO_STATE = '[Anti-Hero] Add Anti-Hero (STATE)',
  MODIFY_ANTI_HERO_API = '[Anti-Hero] Modify Anti-Hero (API)',
  MODIFY_ANTI_HERO_STATE = '[Anti-Hero] Modify Anti-Hero (STATE)',
}

export const getAntiHeroList = createAction(AntiHeroActions.GET_ANTI_HERO_LIST);

export const setAntiHeroList = createAction(AntiHeroActions.SET_ANTI_HERO_LIST, props<{
  antiHeroes: ReadonlyArray<AntiHero>
}>());

export const removeAntiHeroState = createAction(AntiHeroActions.REMOVE_ANTI_HERO_STATE, props<{
  antiHeroId: string
}>());

export const removeAntiHeroApi = createAction(AntiHeroActions.REMOVE_ANTI_HERO_API, props<{ antiHeroId: string }>());

export const addAntiHeroState = createAction(AntiHeroActions.ADD_ANTI_HERO_STATE, props<{ antiHero: AntiHero }>());

export const addAntiHeroApi = createAction(AntiHeroActions.ADD_ANTI_HERO_STATE, props<{ antiHero: AntiHero }>());

export const modifyAntiHeroState = createAction(AntiHeroActions.MODIFY_ANTI_HERO_STATE, props<{
  antiHero: AntiHero
}>());

export const modifyAntiHeroApi = createAction(AntiHeroActions.MODIFY_ANTI_HERO_API, props<{ antiHero: AntiHero }>());


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, tap } from 'rxjs';
import { AntiHero } from '../models/anti-hero.interface';
import { AntiHeroActions } from './anti-hero.actions';

@Injectable()
export class AntiHeroEffects {
  constructor(
    private actions$: Actions,
    private antiHeroService: AntiHeroService,
    private router: Router
  ) {
  }

  getAntiHeroes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AntiHeroActions.GET_ANTI_HERO_LIST),
      mergeMap(() => this.antiHeroService.getAntiHeroes().pipe(
        map(antiHeroes => ({ type: AntiHeroActions.SET_ANTI_HERO_LIST, antiHeroes })),
        catchError(() => EMPTY)
      ))
    )
  }, { dispatch: true });

  removeAntiHero$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AntiHeroActions.REMOVE_ANTI_HERO_API),
      mergeMap((data: { payload: string }) => this.antiHeroService.deleteAntiHero(data.payload).pipe(
        map(() => ({
          type: AntiHeroActions.REMOVE_ANTI_HERO_STATE,
          antiHeroId: data.payload
        })),
        catchError(() => EMPTY)
      ))
    )
  }, { dispatch: true });

  addAntiHero$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AntiHeroActions.ADD_ANTI_HERO_API),
      mergeMap((data: { payload: AntiHero }) => this.antiHeroService.addAntiHero(data.payload).pipe(
        map(() => ({
          type: AntiHeroActions.ADD_ANTI_HERO_STATE,
          antiHero: data.payload
        })),
        tap(() => this.router.navigate(['anti-heroes'])),
        catchError(() => EMPTY)
      ))
    )
  }, { dispatch: true });

  modifyAntiHero$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AntiHeroActions.MODIFY_ANTI_HERO_API),
      mergeMap((data: { payload: AntiHero }) => this.antiHeroService.updateAntiHero(data.payload).pipe(
        map(() => ({
          type: AntiHeroActions.MODIFY_ANTI_HERO_STATE,
          antiHero: data.payload
        })),
        tap(() => this.router.navigate(['anti-heroes'])),
        catchError(() => EMPTY)
      ))
    )
  }, { dispatch: true });
}

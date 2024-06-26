import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, tap } from 'rxjs';
import { AntiHero } from '../models/anti-hero.interface';
import { AntiHeroService } from '../services/anti-hero.service';
import { AntiHeroActions } from './anti-hero.actions';

@Injectable()
export class AntiHeroEffects {
  constructor(
    private actions$: Actions,
    private antiHeroService: AntiHeroService,
    private router: Router
  ) {
  }

  getAntiHeroes$ = createEffect<any>(() => {
    return this.actions$.pipe(
      ofType(AntiHeroActions.GET_ANTI_HERO_LIST),
      mergeMap(() => this.antiHeroService.getAntiHeroes().pipe(
        map(antiHeroes => ({ type: AntiHeroActions.SET_ANTI_HERO_LIST, antiHeroes })),
        catchError(() => EMPTY)
      ))
    )
  }, { dispatch: true, functional: true });

  removeAntiHero$ = createEffect<any>(() => {
    return this.actions$.pipe(
      ofType(AntiHeroActions.REMOVE_ANTI_HERO_API),
      mergeMap((data: { antiHeroId: string }) => this.antiHeroService.deleteAntiHero(data.antiHeroId).pipe(
        map(() => ({
          type: AntiHeroActions.REMOVE_ANTI_HERO_STATE,
          antiHeroId: data.antiHeroId
        })),
        catchError(() => EMPTY)
      ))
    )
  }, { dispatch: true, functional: true });

  addAntiHero$ = createEffect<any>(() => {
    return this.actions$.pipe(
      ofType(AntiHeroActions.ADD_ANTI_HERO_API),
      mergeMap((data: { antiHero: AntiHero }) => this.antiHeroService.addAntiHero(data.antiHero).pipe(
        map(() => ({
          type: AntiHeroActions.ADD_ANTI_HERO_STATE,
          antiHero: data.antiHero
        })),
        tap(() => this.router.navigate(['anti-heroes'])),
        catchError(() => EMPTY)
      ))
    )
  }, { dispatch: true, functional: true });

  modifyAntiHero$ = createEffect<any>(() => {
    return this.actions$.pipe(
      ofType(AntiHeroActions.MODIFY_ANTI_HERO_API),
      mergeMap((data: { antiHero: AntiHero }) => this.antiHeroService.updateAntiHero(data.antiHero.id, data.antiHero).pipe(
        map((data: AntiHero) => ({
          type: AntiHeroActions.MODIFY_ANTI_HERO_STATE,
          antiHero: data
        })),
        tap(() => this.router.navigate(['anti-heroes'])),
        catchError(() => EMPTY)
      ))
    )
  }, { dispatch: true, functional: true });
}

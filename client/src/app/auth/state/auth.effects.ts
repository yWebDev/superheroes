import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs';
import { AuthenticateService } from '../../core/services/authenticate.service';
import { User } from '../models/user';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthenticateService, private router: Router) {
  }

  loginUser$ = createEffect(() => this.actions$.pipe(
    tap(t => console.log(t)),
    ofType(AuthActions.LOGIN),
    mergeMap((data: { type: string, payload: User }) => this.authService.login(data.payload).pipe(
        map((data) => ({ ...data, type: AuthActions.SET_TOKEN, token: data.token })),
        tap(() => this.router.navigate(['anti-heroes'])),
        catchError(async (data) => ({
          type: AuthActions.AUTH_ERROR, error: data.error
        }))
      )
    )), { dispatch: true }
  );

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.CREATE_USER),
    mergeMap((data: { type: string, payload: User }) => this.authService.register(data.payload).pipe(
        map((data) => ({ ...data, type: AuthActions.SET_TOKEN, token: data.token })),
        tap(() => this.router.navigate(['login'])),
        catchError(async (data) => ({
          type: AuthActions.AUTH_ERROR, error: data.error
        }))
      )
    )), { dispatch: true }
  );

}

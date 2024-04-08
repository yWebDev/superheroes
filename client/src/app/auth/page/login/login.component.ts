import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthenticateService } from '../../../core/services/authenticate.service';
import { User } from '../../models/user';
import { AuthActions } from '../../state/auth.actions';
import { selectError } from '../../state/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnDestroy {
  error$ = this.store.select(selectError());
  errorSub: Subscription | undefined;

  constructor(private authService: AuthenticateService, private router: Router, private store: Store, private _snackBar: MatSnackBar) {
    this.checkJWT();
    this.getError();
  }

  ngOnDestroy() {
    this.errorSub?.unsubscribe();
  }

  submit(data: User) {
    this.store.dispatch({ type: AuthActions.LOGIN, payload: data });
  }

  private checkJWT(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/anti-heroes']);
    }
  }

  private getError() {
    this.errorSub = this.error$.subscribe(data => {
      if (data) {
        this._snackBar.open(data.message, 'Error');
      }
    })
  }
}

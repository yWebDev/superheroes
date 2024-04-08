import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthenticateService } from '../../../core/services/authenticate.service';
import { User } from '../../models/user';
import { AuthActions } from '../../state/auth.actions';
import { selectError } from '../../state/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  error$ = this.store.select(selectError());
  errorSub: Subscription | undefined;

  constructor(private authService: AuthenticateService, private router: Router, private store: Store, private _snackBar: MatSnackBar) {
    this.getError();
  }

  submit(data: User) {
    this.store.dispatch({ type: AuthActions.CREATE_USER, payload: data });
  }

  private getError() {
    this.errorSub = this.error$.subscribe(data => {
      if (data) {
        this._snackBar.open(data.message, 'Error');
      }
    })
  }
}

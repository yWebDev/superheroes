import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

export const authGuard: CanMatchFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthenticateService);
  if (auth.isAuthenticated()) {
    return true;
  }

  router.navigate(['login']);
  return false;
};

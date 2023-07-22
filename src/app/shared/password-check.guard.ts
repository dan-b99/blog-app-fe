import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { SnackBarService } from './snack-bar.service';

export const passwordCheckGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const snackBar = inject(SnackBarService);
  const router = inject(Router);

  if(authService.passChech()) {
    return true;
  }
  router.navigateByUrl("/reset-password").then(() => snackBar.open("Change the password"));
  return false;
};

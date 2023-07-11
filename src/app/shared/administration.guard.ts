import { CanActivateFn, Router } from '@angular/router';
import { authenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';
import { SnackBarService } from './snack-bar.service';

export const administrationGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const sb = inject(SnackBarService);
  
  if(authService.isAdmin()) {
    return true;
  }
  router.navigateByUrl("/home").then(() => sb.open("Cannot access this page"));
  return false;
};

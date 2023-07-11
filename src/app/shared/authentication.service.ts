import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { RuoloOutputDTO } from './models/auth/ruolo-output-dto.model';
import { Router } from '@angular/router';
import { SnackBarService } from './snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { find, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userService: UserService, private snackBar: SnackBarService, private router: Router) { }

  isLogged(): boolean {
    const jwt = localStorage.getItem("jwt");
    if(jwt) {
      const jwtParts = jwt.split(".");
      const decodedPayload = JSON.parse(atob(jwtParts[1]));
      const expDate = new Date(decodedPayload.exp * 1000);
      const currentDate = new Date();
      if(currentDate < expDate) {
        return true
      }
    }
    this.router.navigateByUrl("/logout").then(() => this.snackBar.open("Effettua il login"));
    return false;
  }

 isAdmin() {
  const roles = localStorage.getItem("roles");
  if(roles?.includes("ROLE_ADMIN")) {
    return true;
  }
  return false;
  }
}

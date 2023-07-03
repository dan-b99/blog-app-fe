import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { RuoloOutputDTO } from './models/auth/ruolo-output-dto.model';
import { Router } from '@angular/router';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  ruoli: RuoloOutputDTO[] = [];

  constructor(private userService: UserService, private router: Router, private snack: SnackBarService) { }

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
    this.router.navigateByUrl("/logout");
    return false;
  }
}

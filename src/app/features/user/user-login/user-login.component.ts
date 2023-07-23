import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Autenticazione } from 'src/app/shared/models/auth/autenticazione-dto.model';
import { LoginDTO } from 'src/app/shared/models/auth/login-dto.model';
import { RuoloOutputDTO } from 'src/app/shared/models/auth/ruolo-output-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-login',
  template: `
    <div class="container mt-5">
      <mat-card class="p-5">
        <form [formGroup]="loginForm">
          <div class="row m-2">
          <mat-form-field appearance="outline" class="col-11">
          <mat-label>Email</mat-label>
          <input matInput placeholder="pat@example.com" formControlName="email" required>
          <mat-error *ngIf="loginForm.controls['email'].invalid">{{emailErrors()}}</mat-error>
        </mat-form-field>
        </div>
        <div class="row m-2">
        <mat-form-field appearance="outline" class="col-11">
          <mat-label>Password</mat-label>
          <input matInput [type]="hide ? 'password' : 'text'" formControlName="password">
          <mat-error *ngIf="loginForm.controls['password'].invalid">{{errorRequired('password')}}</mat-error>
          <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
            <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
          </button>
        </mat-form-field>
          </div>
          <div class="row mx-3">
            <button class="btn btn-secondary btn-sm col-3" [disabled]="loginForm.invalid" (click)="sendLogin()">Login</button>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styles: [
  ]
})
export class UserLoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private snackBar: SnackBarService, private router: Router) {
    this.loginForm = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  errorRequired(field: string): string {
    return this.loginForm.controls[field].hasError('required') ? 'Il campo è obbligatorio' : '';
  }

  emailErrors(): string {
    if(this.loginForm.controls['email'].hasError('required')) {
      return 'Il campo è obbligatorio';
    }
    return this.loginForm.controls['email'].hasError('email') ? 'Email invalida' : '';
  }

  sendLogin() {
    let userLogged: LoginDTO = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    let roles: string = "";
    this.userService.login(userLogged).subscribe({
      next: (authenticated: Autenticazione) => {
        localStorage.setItem("jwt", authenticated.jwt);
        localStorage.setItem("USER_ID", authenticated.utenteOutput.id + '');
        localStorage.setItem("matching", authenticated.utenteOutput.regexMatch ? 'true' : 'false');
        localStorage.setItem("notifications", authenticated.utenteOutput.iscritto ? 'true' : 'false');
        authenticated.utenteOutput.ruoli.map((val: RuoloOutputDTO) => roles += val.authority + " ");
        localStorage.setItem("roles", roles);
        this.router.navigateByUrl('/home').then(() => window.location.reload());
      }, 
      error: (respErr: HttpErrorResponse) => {
        this.snackBar.open(respErr.error.message)
      }
    });
  }

}

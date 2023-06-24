import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
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
    console.log(this.loginForm.controls);
  }

}

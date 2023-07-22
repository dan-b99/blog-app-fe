import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UtenteOutput } from 'src/app/shared/models/auth/utente-output.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-change-password',
  template: `
    <div class="container-fluid d-flex flex-column justify-content-center">
      <div class="row mt-5 mb-2">
        <h1 class="col-9 ms-3"><strong>Password change</strong></h1>
      </div>
      <div class="row mt-4">
        <form [formGroup]="passForm" class="p-3">
          <mat-form-field>
            <mat-label>Enter new password</mat-label>
            <input matInput [type]="hide ? 'password' : 'text'" formControlName="newPass">
            <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
              <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
          </mat-form-field>
          <button mat-raised-button color="primary" class="ms-3" (click)="changePass()">Change</button>
        </form>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ChangePasswordComponent {
  passForm: FormGroup;
  hide: boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: SnackBarService, private router: Router) {
    this.passForm = fb.group({
      newPass: new FormControl('')
    })
  }

  changePass() {
    this.userService.updatePassword(((Number)(localStorage.getItem("USER_ID"))), this.passForm.value.newPass).subscribe({
      next: (user: UtenteOutput) => {
        localStorage.removeItem("matching");
        localStorage.setItem("matching", user.regexMatch ? 'true' : 'false');
        this.router.navigateByUrl("/home").then(() => this.snackbar.open("Password changed"));
      },
      error: (err: HttpErrorResponse) => this.snackbar.open(err.error.message)
    });
  }
}

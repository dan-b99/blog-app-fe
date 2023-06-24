import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrazioneDTO } from 'src/app/shared/models/auth/registrazione-dto.model';
import { UtenteOutput } from 'src/app/shared/models/auth/utente-output.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-registration',
  template: `
  <div class="container mt-5">
    <mat-card class="p-5">
    <form [formGroup]="registrationForm">
      <div class="row m-2">
        <mat-form-field appearance="outline" class="col-4">
          <mat-label>Nome</mat-label>
          <input matInput placeholder="Il tuo nome" formControlName="nome">
          <mat-error *ngIf="registrationForm.controls['nome'].invalid">{{errorRequired('nome')}}</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" class="col-4">
          <mat-label>Cognome</mat-label>
          <input matInput placeholder="Il tuo cognome" formControlName="cognome">
          <mat-error *ngIf="registrationForm.controls['cognome'].invalid">{{errorRequired('cognome')}}</mat-error>
        </mat-form-field>
      </div>
      <div class="row m-2">
        <mat-form-field appearance="outline" class="col-3">
          <mat-label>Username</mat-label>
          <input matInput placeholder="Il tuo username" formControlName="username">
          <mat-error *ngIf="registrationForm.controls['username'].invalid">{{errorRequired('username')}}</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" class="col-3">
          <mat-label>Email</mat-label>
          <input matInput placeholder="pat@example.com" formControlName="email" required>
          <mat-error *ngIf="registrationForm.controls['email'].invalid">{{emailErrors()}}</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" class="col-3">
          <mat-label>Password</mat-label>
          <input matInput [type]="hide ? 'password' : 'text'" formControlName="password">
          <mat-error *ngIf="registrationForm.controls['password'].invalid">{{errorRequired('password')}}</mat-error>
          <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
            <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
          </button>
        </mat-form-field>
      </div>
      <div class="row mx-3">
        <button class="btn btn-secondary btn-sm col-3" [disabled]="registrationForm.invalid" (click)="sendRegistration()">Invia</button>
      </div>
    </form>
    </mat-card>
  </div>
  `,
  styles: [
    `
    `
  ]
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private snackBar: MatSnackBar) {
    this.registrationForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  errorRequired(field: string): string {
    return this.registrationForm.controls[field].hasError('required') ? 'Il campo è obbligatorio' : '';
  }

  emailErrors(): string {
    if(this.registrationForm.controls['email'].hasError('required')) {
      return 'Il campo è obbligatorio';
    }
    return this.registrationForm.controls['email'].hasError('email') ? 'Email invalida' : '';
  }

  sendRegistration() {
    let userToRegister: RegistrazioneDTO = {
      nome: this.registrationForm.controls['nome'].value,
      cognome: this.registrationForm.controls['cognome'].value,
      username: this.registrationForm.controls['username'].value,
      password: this.registrationForm.controls['password'].value,
      email: this.registrationForm.controls['email'].value
    };
    this.userService.register(userToRegister).subscribe({
      next: (registered: UtenteOutput) => {
        this.snackBar.open("Operazione riuscita", "OK", {
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      },
      error: (respErr: HttpErrorResponse) => {
        this.snackBar.open(respErr.error.message, "OK", {
          verticalPosition: 'top',
          horizontalPosition: 'right'
        }); 
      }
    });
  }
}

import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  template: `
  <div class="container mt-5">
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
          <input matInput placeholder="La tua password" formControlName="password">
          <mat-error *ngIf="registrationForm.controls['password'].invalid">{{errorRequired('password')}}</mat-error>
        </mat-form-field>
      </div>
      <div class="row m-2">
        <button class="btn btn-secondary btn-sm col-5" (click)="send()">Invia</button>
      </div>
    </form>
  </div>
  `,
  styles: [
    `
    `
  ]
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
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

  send() {
    console.log(this.registrationForm.controls);
  }

}

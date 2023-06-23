import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  template: `
  <div class="container mt-3">
    <form [formGroup]="registrationForm">
      <mat-form-field appearance="outline">
        <mat-label>Nome</mat-label>
        <input matInput placeholder="Il tuo nome" formControlName="nome">
      </mat-form-field>
      <button class="btn btn-info btn-sm" (click)="send()">Invia</button>
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
      nome: new FormControl(''),
      cognome: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  send() {
    console.log(this.registrationForm.controls);
  }

}

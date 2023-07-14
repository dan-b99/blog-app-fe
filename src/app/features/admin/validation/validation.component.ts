import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/shared/blog.service';
import { ValidazioneDinamicaPasswordDTO } from 'src/app/shared/models/auth/validazione-dinamica-password-dto.model';
import { ValidazioneDinamicaBlogDTO } from 'src/app/shared/models/blog/validazione-dniamica-blog-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-validation',
  template: `
    <div class="container-fluid mt-3 d-flex justify-content left align-items-center">
      <form [formGroup]="formBlog" class="form control p-2">
        <div class="row mt-2 p-2">
          <mat-form-field>
            <mat-label>Select field</mat-label>
            <mat-select (selectionChange)="changedSelect($event)" formControlName="selezione">
              <mat-option value="titolo">Title</mat-option>
              <mat-option value="contenuto">Content</mat-option>
              <mat-option value="password">Password</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div class="row my-2">
          <mat-form-field class="col-5 me-2">
            <mat-label>Minimum length</mat-label>
            <input formControlName="minimo" matInput type="number">
          </mat-form-field>
          <mat-form-field class="col-5">
            <mat-label>Maximum length</mat-label>
            <input formControlName="massimo" matInput type="number">
          </mat-form-field>
        </div>
        <div *ngIf="isPassword" class="row my-2">
          <mat-checkbox formControlName="caratteriSpeciali">Special characters</mat-checkbox>
          <mat-checkbox formControlName="maiuscole" class="ms-3 col-9">At least one upper case letter</mat-checkbox>
        </div>
        <div class="row ms-1">
          <button class="btn btn-secondary btn-sm col-4" (click)="clickMeBlog()">Invia</button>
        </div>
      </form>
    </div>
  `,
  styles: [
  ]
})
export class ValidationComponent {
  formBlog: FormGroup;
  isPassword: boolean = false;

  constructor(private fb: FormBuilder, private blogService: BlogService, private userService: UserService, private sb: SnackBarService, private router: Router) {
    this.formBlog = fb.group({
      selezione: new FormControl(),
      minimo: new FormControl(),
      massimo: new FormControl(),
      caratteriSpeciali: new FormControl<boolean>(false),
      maiuscole: new FormControl<boolean>(false)
    });
  }

  changedSelect(event: MatSelectChange): void {
    console.log("CAMBIO", this.formBlog.value);
    if(event.value === 'password') {
      this.isPassword = true;
    }
    else if(this.isPassword) {
      this.isPassword = false;
      this.formBlog.reset({caratteriSpeciali: false, maiuscole: false});
    }
  }

  clickMeBlog() {
    if(!this.isPassword) {
      const validateBlog: ValidazioneDinamicaBlogDTO = {
        campo: this.formBlog.controls['selezione'].value,
        minimo: this.formBlog.controls['minimo'].value,
        massimo: this.formBlog.controls['massimo'].value
      };
      this.blogService.setBlogValidation(validateBlog).subscribe({
        next: () => this.sb.open("Operazione riuscita"),
        error: (err: HttpErrorResponse) => this.sb.open(err.error.message)
      });
    }
    else {
      const validatePass: ValidazioneDinamicaPasswordDTO = {
        campo: this.formBlog.controls['selezione'].value,
        minimo: this.formBlog.controls['minimo'].value,
        massimo: this.formBlog.controls['massimo'].value,
        caratteriSpeciali: this.formBlog.controls['caratteriSpeciali'].value === null ? false : this.formBlog.controls['caratteriSpeciali'].value,
        maiuscole: this.formBlog.controls['maiuscole'].value === null ? false : this.formBlog.controls['maiuscole'].value,
        regexPass: ''
      }
      console.log(validatePass);
      this.userService.setPasswordValidation(validatePass).subscribe({
        next: () => this.sb.open("Operazione riuscita"),
        error: (err: HttpErrorResponse) => this.sb.open(err.error.message)
      })
    }
    this.formBlog.reset();
  }

}

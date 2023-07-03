import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/shared/blog.service';
import { ValidazioneDinamicaDTO } from 'src/app/shared/models/blog/validazione-dniamica-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-validation',
  template: `
    <div class="container-fluid m-3 d-flex justify-content left align-items-center">
      <form [formGroup]="form" class="form control p-2">
        <div class="row mt-2 p-2">
          <mat-form-field>
            <mat-label>Seleziona campo</mat-label>
            <mat-select formControlName="selezione">
              <mat-option value="titolo">Titolo</mat-option>
              <mat-option value="contenuto">Contenuto</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div class="row my-2">
          <mat-form-field class="col-5 me-2">
            <mat-label>Lunghezza minima</mat-label>
            <input formControlName="minimo" matInput type="number">
          </mat-form-field>
          <mat-form-field class="col-5">
            <mat-label>Lunghezza massima</mat-label>
            <input formControlName="massimo" matInput type="number">
          </mat-form-field>
        </div>
        <div class="row ms-1">
          <button class="btn btn-secondary btn-sm col-4" (click)="clickMe()">Invia</button>
        </div>
      </form>
    </div>
  `,
  styles: [
  ]
})
export class ValidationComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService, private sb: SnackBarService, private router: Router) {
    this.form = fb.group({
      selezione: new FormControl(),
      minimo: new FormControl(),
      massimo: new FormControl() 
    });
  }

  clickMe() {
    console.log("FORM", this.form);
    let validate: ValidazioneDinamicaDTO = {
      campo: this.form.controls['selezione'].value,
      minimo: this.form.controls['minimo'].value,
      massimo: this.form.controls['massimo'].value
    };
    this.blogService.setValidation(validate).subscribe({
      next: () => this.router.navigateByUrl("/write").then(() => this.sb.open("Operazione riuscita")),
      error: (err: HttpErrorResponse) => this.sb.open(err.error.message)
    });
  }

}

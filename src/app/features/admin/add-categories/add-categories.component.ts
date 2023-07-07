import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/shared/blog.service';
import { AggiuntaCategoriaDTO } from 'src/app/shared/models/blog/aggiunta-categoria-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-add-categories',
  template: `
    <div class="container-fluid mt-4">
      <div class="row d-flex justify-content-center mb-5">
        <h1 class="col-auto"><strong>Aggiungi una categoria</strong></h1>
      </div>
      <div class="row d-flex justify-content-left ms-3 mt-2">
        <form class="form control" [formGroup]="catForm">
          <mat-form-field appearance="outline">
            <mat-label>Nome categoria</mat-label>
            <input matInput formControlName="nome" placeholder="Nome">
          </mat-form-field>
          <button mat-fab extended color="primary" class="ms-3 mt-2" (click)="send()">
            <mat-icon>done</mat-icon>
            Invia
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class AddCategoriesComponent {
  catForm: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService, private sb: SnackBarService, private router: Router) {
    this.catForm = this.fb.group({
      nome: new FormControl()
    });
  }

  send() {
    const categoria: AggiuntaCategoriaDTO = {
      nome: this.catForm.controls['nome'].value
    }
    this.blogService.addCategory(categoria).subscribe({
      next: () => this.sb.open("Operazione riuscita"),
      error: (err: HttpErrorResponse) => this.sb.open(err.error.message)
    });
    this.catForm.reset()
  }

}

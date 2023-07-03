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
    <div class="container-fluid m-3">
      <div class="row">
        <h2><strong>Aggiungi una categoria</strong></h2>
      </div>
      <div class="row mt-2">
        <form class="form control" [formGroup]="catForm">
          <mat-form-field appearance="outline">
            <mat-label>Nome categoria</mat-label>
            <input matInput formControlName="nome" placeholder="Nome">
          </mat-form-field>
          <button class="btn btn-secondary ms-3 btn-lg" (click)="send()">Invia</button>
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
      next: () => this.router.navigateByUrl("/home").then(() => this.sb.open("Operazione riuscita")),
      error: (err: HttpErrorResponse) => this.sb.open(err.error.message)
    });
  }

}

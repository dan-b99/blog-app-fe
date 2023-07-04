import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import { BlogService } from 'src/app/shared/blog.service';
import { VisualizzaCategoriaDTO } from 'src/app/shared/models/blog/visualizza-categoria-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-ritch-text',
  template: `
    <div class="container-fluid d-flex align-items-center">
      <form [formGroup]="form" class="form-control p-3 m-2">
        <div class="row">
          <p-editor formControlName="titolo" [style]="{'min-height': '60px'}" placeholder="Titolo..." required>
            <ng-template pTemplate="header">
              <select class="ql-size">
                <option selected></option>
                <option value="large"></option>
                <option value="huge"></option>
              </select>
              <span class="ql-formats">
                <button type="button" class="ql-bold" aria-label="Bold"></button>
                <button type="button" class="ql-italic" aria-label="Italic"></button>
                <button type="button" class="ql-underline" aria-label="Underline"></button>
              </span>
            </ng-template>
          </p-editor>
        </div>
        <div class="row my-4">
          <p-editor formControlName="corpo" [style]="{'min-height': '120px'}" [modules]="configModuleBody" placeholder="Testo..." required></p-editor>
        </div>
        <div class="row mb-4">
          <p-editor formControlName="tags" [style]="{'min-height': '75px'}" placeholder="Inserisci tags separati da virgola...">
            <ng-template pTemplate="header">
              <select class="ql-size">
                <option selected></option>>
              </select>
            </ng-template>
          </p-editor>
        </div>
        <div class="row mb-4 col-9">
          <p-multiSelect [options]="categories" formControlName="categoria" defaultLabel="Categorie" optionLabel="nome" optionValue="id" required [showHeader]="false" [showClear]="true"></p-multiSelect>
        </div>
        <div class="row justify-content-center">
          <button class="btn btn-secondary btm-sm col-3" (click)="send()" [disabled]="form.invalid">Invia</button>
        </div>
      </form>
    </div>
  `,
  styles: [
  ]
})
export class RitchTextComponent implements OnInit {
  form: FormGroup;
  @Output() event: EventEmitter<FormGroup>;
  categories!: VisualizzaCategoriaDTO[];
  configModuleBody: any = {
    blotFormatter: { }
  }

  constructor(private fb: FormBuilder, private bs: BlogService, private sb: SnackBarService) {
    this.form = fb.group({
      titolo: new FormControl(),
      corpo: new FormControl(),
      tags: new FormControl(),
      categoria: new FormControl()
    });
    this.event = new EventEmitter();
  }

  ngOnInit(): void {
    this.bs.getCategories().subscribe({
      next: (arr: VisualizzaCategoriaDTO[]) => this.categories = arr,
      error: (err: HttpErrorResponse) => this.sb.open(err.error.message)
    });
  }

  send() {
    this.event.emit(this.form);
  }
}

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
        <div class="row mb-4">
          <quill-editor formControlName="titolo" [modules]="configModuleTitle" [styles]="{'min-height': '100'}" placeholder="Titolo qui..."></quill-editor>
        </div>
        <br>
        <div class="row my-4">
          <p-editor formControlName="corpo" [style]="{'min-height': '120px'}" [modules]="configModuleBody" placeholder="Testo..." required></p-editor>
        </div>
        <div class="row mb-4">
        <p-chips formControlName="tags" [separator]="separatorStr" placeholder="Tags: a, b c"></p-chips>
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
  configModuleTitle: any = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline']
    ]
  }
  configModuleBody: any = {
    blotFormatter: { }
  }
  separatorStr: string  = ',| ';

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

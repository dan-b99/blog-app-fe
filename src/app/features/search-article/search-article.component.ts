import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/shared/blog.service';
import { VisualizzaArticoloDTO } from 'src/app/shared/models/blog/visualizza-articolo-dto.model';
import { VisualizzaCategoriaDTO } from 'src/app/shared/models/blog/visualizza-categoria-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-search-article',
  template: `
  <div class="container-fluid d-flex justify-content-center mt-3 mb-2">
    <h1><strong>Search something...</strong></h1>
  </div>
  <div class="container-fluid d-flex justify-content-left">
    <form [formGroup]="form" class="form-control m-4 p-4">
      <div class="row mt-4">
        <mat-form-field class="col-4 ms-3">
          <mat-label>Insert keyword</mat-label>
          <input matInput type="text" formControlName="keyword" (input)="textSelected()">
      </mat-form-field>
      </div>
      <div class="row ms-1">
        <p-chips formControlName="tags" placeholder="Insert a tag and enter" class="mb-4" (onFocus)="tagsSelected()"></p-chips>
        <p-multiSelect [options]="categorie" formControlName="categories" defaultLabel="Categories" optionLabel="nome" optionValue="id" [showHeader]="false" 
          [showClear]="true" (onFocus)="categoriesSelected()"></p-multiSelect>
      </div>
      <div class="row justify-content-center">
          <button class="btn btn-secondary btm-sm col-3" (click)="sendData()">Invia</button>
          <button class="btn btn-danger btn-sm col-3 ms-3" (click)="formReset()">Reset</button>
        </div>
    </form>
  </div>
  <div *ngIf="articoliTrovati.length > 0" class="container-fluid d.flex justify-content-center">
    <div *ngFor="let articolo of articoliTrovati">
      <mat-card class="mt-4 me-3">
          <mat-card-header>
            <mat-card-title-group>
              <mat-card-title [innerHTML]="articolo.titolo"></mat-card-title>
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            <span [innerHTML]="textSeparator(articolo.contenuto)"></span>
            <button class="btn btn-secondary btn-sm mt-3" (click)="reading(articolo.id)">Continue reading</button>
          </mat-card-content>
      </mat-card>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class SearchArticleComponent implements OnInit{
  private isTextSelected: boolean = false;
  private isCategorySelected: boolean = false;
  private isTagSelected: boolean = false;
  categorie: VisualizzaCategoriaDTO[] = [];
  form: FormGroup;
  articoliTrovati: VisualizzaArticoloDTO[] = [];
  
  constructor(private fb: FormBuilder, private blogService: BlogService, private sb: SnackBarService, private router: Router) { 
    this.form = fb.group({
      keyword: new FormControl<string>(''),
      categories: new FormControl<number[] | null>(null),
      tags: new FormControl<string | null>(null)
    });
  }

  ngOnInit(): void {
    this.blogService.getCategories().subscribe({
      next: (vals: VisualizzaCategoriaDTO[]) => this.categorie = vals,
      error: (err: HttpErrorResponse) => this.sb.open(err.error.message)
    });
  }
  
  textSelected() {
    if(!this.isTextSelected) {
      this.isTextSelected = true;
       this.form.controls['categories'].disable();
       this.form.controls['tags'].disable();
    }
  }

  tagsSelected() {
    if(!this.isTagSelected) {
      this.isTagSelected = true;
      this.form.controls['categories'].disable();
      this.form.controls['keyword'].disable();
    }
  }

  categoriesSelected() {
    if(!this.isCategorySelected) {
      this.isCategorySelected = true;
      this.form.controls['tags'].disable();
      this.form.controls['keyword'].disable();
    }
  }

  formReset() {
    this.isTextSelected = false;
    this.isCategorySelected = false;
    this.isTagSelected = false;
    this.form.reset();
    this.form.enable();
  }

  sendData() {
    console.log(this.form);
    if(this.form.value['keyword']) {
      this.blogService.getArticlesByKeyword(this.form.value['keyword']).subscribe({
        next: (vals: VisualizzaArticoloDTO[]) => this.articoliTrovati = vals,
        error: (err: HttpErrorResponse) => this.sb.open(err.error.message)
      });
    }
    else if(this.form.value['tags']) {
      this.blogService.getArticlesByTags(this.form.value['tags']).subscribe({
        next: (vals: VisualizzaArticoloDTO[]) => this.articoliTrovati = vals,
        error: (err: HttpErrorResponse) => this.sb.open(err.error.message)
      });
    }
    else if(this.form.value['categories']) {
      this.blogService.getArticlesByCategories(this.form.value['categories']).subscribe({
        next: (vals: VisualizzaArticoloDTO[]) => this.articoliTrovati = vals,
        error: (err: HttpErrorResponse) => this.sb.open(err.error.message)
      });
    }
  }

  textSeparator(content: string): string {
    return content.length > 155 ? content.slice(0, 156) + '\n...' : content;
  }

  reading(id: number) {
    this.router.navigateByUrl("/read/" + id);
  }

}

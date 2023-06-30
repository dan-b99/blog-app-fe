import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-write-article',
  template: `
   <div *ngIf="isTextVisible">
      <div class="row">
        <app-ritch-text (event)="catchData($event)"></app-ritch-text>
      </div>
      <div class="row my-3" *ngIf="formValues">
        <mat-card>
          <mat-card-header>
            <mat-card-title-group>
              <mat-card-title>
                <span [innerHTML]="formValues.value.titolo"></span>
              </mat-card-title>
              <span mat-card-image *ngIf="imgHTML" [innerHTML]="imgHTML"></span>
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            <span [innerHTML]="bodyHTML"></span>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class WriteArticleComponent {
  isTextVisible: boolean = false;
  formValues?: FormGroup;
  tags?: string[];
  regex = /<img[^>]*>/;
  imgHTML?: string;
  bodyHTML?: string;

  constructor() {}

  toggle() {
    this.isTextVisible = !this.isTextVisible;
  }
  
  catchData(event: FormGroup) {
    console.log("METODO CATCH: ", event);
    this.formValues = event;
    if(this.formValues.value.tags) {
      this.tags = this.formValues.value.tags.split(', ');
    }
    this.imgSearch();
    this.bodyAssignment();
  }
  
  private imgSearch() {
    const matchings = this.regex.exec(this.formValues?.value.corpo);
    if(matchings) {
      this.imgHTML = matchings[0];
    }
  }
    
    private bodyAssignment() {
      this.bodyHTML = this.imgHTML ? this.formValues?.value.corpo.replace(this.regex, '') : this.formValues?.value.corpo;
    }
}

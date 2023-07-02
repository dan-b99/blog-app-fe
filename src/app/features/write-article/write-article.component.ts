import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BlogService } from 'src/app/shared/blog.service';

@Component({
  selector: 'app-write-article',
  template: `
  <div class=" d-flex justify-content-center mt-3 mb-5">
    <h1><strong>Pubblica il tuo prossimo articolo!</strong></h1>
  </div>
   <div>
      <app-ritch-text (event)="catchData($event)"></app-ritch-text>
    </div>
  `,
  styles: [
  ]
})
export class WriteArticleComponent {
  formValues?: FormGroup;
  tags?: string[];
  regex = /<img[^>]*>/;
  imgHTML?: string;
  bodyHTML?: string;

  constructor(private blogService: BlogService) {}
  
  catchData(event: FormGroup) {
    console.log("METODO CATCH: ", event);
    this.formValues = event;
    if(this.formValues.value.tags) {
      this.tags = this.formValues.value.tags.split(', ');
    }
    this.imgSearch();
    this.bodyAssignment();
    console.log(`FORM ${this.formValues}, BODY ${this.bodyHTML}, TAGS ${this.formValues.value.tags} FINE`);
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

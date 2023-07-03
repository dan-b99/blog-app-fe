import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BlogService } from 'src/app/shared/blog.service';
import { AggiuntaArticoloDTO } from 'src/app/shared/models/blog/aggiunta-articolo-dto.model';
import { AggiuntaTagDTO } from 'src/app/shared/models/blog/aggiunta-tag-dto.model';

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
    this.sendData();
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

  private sendData() {
    const tagArr: AggiuntaTagDTO[] = [];
    if(this.tags) {
      this.tags[0] = this.tags[0].replace(/<p>/g, "");
      this.tags[this.tags.length-1] = this.tags[this.tags.length-1].replace(/<\/p>/g, "");
      this.tags.forEach((val: string) => tagArr.push({nome: val}));
    }
    let articolo: AggiuntaArticoloDTO = {
      titolo: this.formValues?.value.titolo,
      contenuto: this.formValues?.value.corpo,
      categorie: this.formValues?.value.categoria,
      tags: tagArr
    }
    console.log(articolo); 
  }
}

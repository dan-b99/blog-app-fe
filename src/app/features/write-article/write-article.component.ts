import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/shared/blog.service';
import { AggiuntaArticoloDTO } from 'src/app/shared/models/blog/aggiunta-articolo-dto.model';
import { AggiuntaTagDTO } from 'src/app/shared/models/blog/aggiunta-tag-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

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
  tags: AggiuntaTagDTO[] = [];

  constructor(private blogService: BlogService, private snackBar: SnackBarService, private router: Router) {}
  
  catchData(event: FormGroup) {
    this.formValues = event;
    this.sendData();
  }

  private sendData() {
    if(this.formValues?.value.tags) {
      this.formValues.value.tags.forEach((val: string) => this.tags.push({nome: val}))
    }
    let articolo: AggiuntaArticoloDTO = {
      titolo: this.formValues?.value.titolo,
      contenuto: this.formValues?.value.corpo,
      categorie: this.formValues?.value.categoria,
      tags: this.tags
    }
    this.blogService.addArticle(articolo).subscribe({
      next: () => this.router.navigateByUrl("/home").then(() => this.snackBar.open("Operazione riuscita")),
      error: (err: HttpErrorResponse) => this.snackBar.open(err.error.message)
    }); 
  }
}

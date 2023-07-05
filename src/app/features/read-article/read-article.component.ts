import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BlogService } from 'src/app/shared/blog.service';
import { VisualizzaArticoloDTO } from 'src/app/shared/models/blog/visualizza-articolo-dto.model';
import { VisualizzaTagDTO } from 'src/app/shared/models/blog/visualizza-tag-dto.model';

@Component({
  selector: 'app-read-article',
  template: `
    <div *ngIf="articolo" class="container-fluid p-2 d-flex justify-content-left">
      <div class="container m-2">
        <mat-card class="example-card">
          <mat-card-header>
            <mat-card-title-group>
              <mat-card-title>
                <span [innerHTML]="articolo.titolo"></span>
              </mat-card-title>
              <mat-card-subtitle class="mb-3">
                <span [innerHTML]="autore"></span>
              </mat-card-subtitle>
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            <div [innerHTML]="articolo.contenuto"></div>
            <div class="my-3">
              <h4><strong>Categories</strong></h4>
              <span *ngFor="let c of articolo.categorie">
                <span [innerHTML]="c.nome + ' '"></span>
              </span>
            </div>
            <div *ngIf="tags">
              <span>
                <h4><strong>Tags</strong></h4>
                <span *ngFor="let t of tags">
                  <span [innerHTML]="t + ' | '"></span>
                </span>
              </span>
            </div>
            <div class="mt-3">
              <h4 [innerHTML]="articolo.voti.length ? '<em>Voti</em>' : '<em>Ancora nessun voto...</em>'"></h4>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ReadArticleComponent implements OnInit {
  articolo?: VisualizzaArticoloDTO;
  autore?: string;
  tags?: string[];

  constructor(private blogService: BlogService, private actRoute: ActivatedRoute) { }

  private async getArt() {
    const obsArt$ = this.blogService.getArticleById(this.actRoute.snapshot.params['id']);
    this.articolo = await lastValueFrom(obsArt$);
  }

  async ngOnInit() {
    await this.getArt();
    this.autore = "<em>A cura di " + this.articolo?.utente.nome + " " + this.articolo?.utente.cognome + "</em>";
    if(this.articolo?.tags) {
      this.tags = this.articolo.tags.flatMap((val: VisualizzaTagDTO) => val.nome);
    }
  }
}

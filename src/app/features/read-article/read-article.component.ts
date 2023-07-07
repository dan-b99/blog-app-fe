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
        <mat-card class="p-3">
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
            <mat-divider></mat-divider>
            <div class="row mt-4 mb-3">
              <h4><strong>Categories</strong></h4>
              <mat-chip-listbox>
                <mat-chip *ngFor="let c of articolo.categorie" color="accent" highlighted>{{c.nome}}</mat-chip>
              </mat-chip-listbox>
            </div>
            <mat-divider></mat-divider>
            <div *ngIf="tags" class="row mt-4 mb-3">
              <h4><strong>Tags</strong></h4>
              <mat-chip-listbox>
                <mat-chip *ngFor="let t of tags" color="accent" highlighted>{{t}}</mat-chip>
              </mat-chip-listbox>
            </div>
            <mat-divider></mat-divider>
            <div class="row mt-3">
              <h4 [innerHTML]="articolo.voti.length ? '<em>Votes</em>' : '<em>No votes yet...</em>'"></h4>
              <button mat-fab extended color="accent" class="me-3">
                <mat-icon>thumb_up</mat-icon>
                Like
              </button>
              <button mat-fab extended color="primary">
                <mat-icon>thumb_down</mat-icon>
                Dislike
              </button>
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

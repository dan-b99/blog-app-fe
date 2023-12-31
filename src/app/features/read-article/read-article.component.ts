import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { BlogService } from 'src/app/shared/blog.service';
import { enviroment } from 'src/app/shared/enviroment';
import { AggiuntaVotoDTO } from 'src/app/shared/models/blog/aggiunta-voto-dto.model';
import { VisualizzaArticoloDTO } from 'src/app/shared/models/blog/visualizza-articolo-dto.model';
import { VisualizzaTagDTO } from 'src/app/shared/models/blog/visualizza-tag-dto.model';
import { VisualizzaVotoDTO } from 'src/app/shared/models/blog/visualizza-voto-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { ViewVotesComponent } from './view-votes.component';

@Component({
  selector: 'app-read-article',
  template: `
    <div *ngIf="articolo; else empty" class="container-fluid p-2 d-flex justify-content-left">
      <div class="container m-2">
        <mat-card class="p-3 mb-3">
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
              <button mat-raised-button color="primary" class="col-2" [disabled]="!articolo.voti.length" (click)="showVotes()">
                {{articolo.voti.length ? 'Votes ' + articolo.voti.length : 'No votes yet'}}
              </button>
            </div>
            <div class="row mt-3">
              <button mat-fab extended [color]="hasVoted ? 'primary' : 'basic'" class="col-6 me-3" (click)="liked()">
                  <mat-icon>thumb_up</mat-icon>
                  {{hasVoted ? 'Liked' : 'Like'}}
                </button>
                <button mat-fab extended [color]="hasVoted === false ? 'primary' : 'basic'" class="col-6" (click)="disliked()">
                  <mat-icon>thumb_down</mat-icon>
                  {{hasVoted === false ? 'Disliked' : 'Dislike'}}
                </button>
            </div>
          </mat-card-content>
        </mat-card>
        <app-comment-reply [art]="articolo"></app-comment-reply>
      </div>
    </div>
    <ng-template #empty>
      <div class="container-fluid d-flex justify-content-center">
        <div class="row mt-3">
          <h2>There is nothing to show here...</h2>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
  ],
  providers: [DialogService]
})
export class ReadArticleComponent implements OnInit, OnDestroy {
  articolo?: VisualizzaArticoloDTO;
  autore?: string;
  tags?: string[];
  hasVoted: boolean | null = null;
  dialog?: DynamicDialogRef;
  
  constructor(private blogService: BlogService, private fb: FormBuilder, private actRoute: ActivatedRoute, private snackBar: SnackBarService, private dialogServ: DialogService) { }

  private async getArt() {
    const obsArt$ = this.blogService.getArticleById(this.actRoute.snapshot.params['id']);
    this.articolo = await lastValueFrom(obsArt$);
  }

  private async checkVote(): Promise<void> {
    const checkVote = this.articolo?.voti.find((voto: VisualizzaVotoDTO) => (voto.utente.id === (Number.parseInt(enviroment.user_id!))));
    if(checkVote) {
      this.hasVoted = checkVote.voto ? true : false;
    }
  }

  async ngOnInit() {
    await this.getArt();
    this.autore = "<em>A cura di " + this.articolo?.utente.nome + " " + this.articolo?.utente.cognome + "</em>";
    if(this.articolo?.tags) {
      this.tags = this.articolo.tags.flatMap((val: VisualizzaTagDTO) => val.nome);
    }
    await this.checkVote();
  }

  liked() {
    const voto: AggiuntaVotoDTO = {
      utente: (Number)(enviroment.user_id),
      articolo: this.actRoute.snapshot.params['id'],
      voto: true
    };
    this.blogService.setVote(voto).subscribe({
      next: () => {
        this.snackBar.open("Votato");
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => this.snackBar.open(err.error.message)
    });
  }

  disliked() {
    const voto: AggiuntaVotoDTO = {
      utente: (Number)(enviroment.user_id),
      articolo: this.actRoute.snapshot.params['id'],
      voto: false
    };
    this.blogService.setVote(voto).subscribe({
      next: () => {
        this.snackBar.open("Votato");
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => this.snackBar.open(err.error.message)
    });
  }

  showVotes() {
    this.showDialog();
  }

  private showDialog() {
    this.dialog = this.dialogServ.open(ViewVotesComponent, {
      header: 'Votes',
      data: this.articolo!.id,
      dismissableMask: true,
      draggable: true,
      position: 'center'
    });
  }

  ngOnDestroy(): void {
    if(this.dialog) {
      this.dialog.close();
    }
  }
}

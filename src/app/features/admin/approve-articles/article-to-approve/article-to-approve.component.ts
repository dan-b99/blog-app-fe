import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BlogService } from 'src/app/shared/blog.service';
import { VisualizzaArticoloDTO } from 'src/app/shared/models/blog/visualizza-articolo-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-article-to-approve',
  template: `
    <div *ngIf="articolo; else empty" class="container-fluid d-flex justify-content-left">
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
            <div *ngIf="articolo.tags" class="row mt-4 mb-3">
              <h4><strong>Tags</strong></h4>
              <mat-chip-listbox>
                <mat-chip *ngFor="let t of articolo.tags" color="accent" highlighted>{{t.nome}}</mat-chip>
              </mat-chip-listbox>
            </div>
            <mat-divider></mat-divider>
            <div class="row mt-3">
              <button mat-fab extended color="primary" class="me-3" (click)="approved()">
                <mat-icon>check</mat-icon>
                {{'Approve'}}
              </button>
              <button mat-fab extended color="warn" class="me-3" (click)="deleted()">
                <mat-icon>delete</mat-icon>
                {{'Delete'}}
              </button>
            </div>
          </mat-card-content>
      </mat-card>
    </div>
    <ng-template #empty>
      <div class="container-fluid d-flex justify-content-center">
        <h1 class="mt-4"><strong>There is nothing to show...</strong></h1>
      </div>
    </ng-template>
  `,
  styles: [
  ]
})
export class ArticleToApproveComponent implements OnInit{

  articolo?: VisualizzaArticoloDTO;
  autore?: string;

  constructor(private blogService: BlogService, private sb: SnackBarService, private router: Router, private actRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const obs$ = this.blogService.notApprovedById(this.actRoute.snapshot.params['id']);
    this.articolo = await lastValueFrom(obs$);
    this.autore = '<em>A cura di ' + this.articolo.utente.nome + " " + this.articolo.utente.cognome + '</em>';
  }

  approved() {
    this.blogService.approveArticle((Number)(this.actRoute.snapshot.params['id'])).subscribe({
      next: () => this.router.navigateByUrl("/approve").then(() => this.sb.open("The article has been approved")),
      error: (err: HttpErrorResponse) => this.sb.open(err.error.message)
    });
  }

  deleted() {
    this.blogService.deleteArticle((Number)(this.actRoute.snapshot.params['id'])).subscribe({
      next: () => this.router.navigateByUrl("/approve").then(() => this.sb.open("The article has been deleted")),
      error: (err: HttpErrorResponse) => this.sb.open(err.error.message)
    });
  }
}

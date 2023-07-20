import { Component, Inject, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VisualizzaRispostaDTO } from 'src/app/shared/models/blog/visualizza-risposta-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-view-replies',
  template: `
    <div class="container-fluid d-flex justify-content-center">
      <mat-card class="row p-4" *ngFor="let rep of replies">
        <mat-card-header>
          <mat-card-title>
            <span [innerHTML]="rep.autore.username + ' [' + rep.autore.email + ' #' + rep.id + '] replies to'"></span>
          </mat-card-title>
          <mat-card-subtitle>
            <span [innerHTML]="'Comment #' + rep.padre.id"></span>
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <span [innerHTML]="rep.testo"></span>
          <span>
            <button mat-fab extended color="basic" class="ms-3" (click)="passId(rep.id)">
              <mat-icon>reply</mat-icon>
                Reply
            </button>
          </span>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
  ],
  providers: [DialogService]
})
export class ViewRepliesComponent implements OnInit {
  replies: VisualizzaRispostaDTO[] = [];

  constructor(private snackBar: SnackBarService, private dialog: DynamicDialogRef, private config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.replies = this.config.data;
  }

  passId(id: number) {
    this.dialog.close(id);
  }

}

import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VisualizzaRispostaDTO } from 'src/app/shared/models/blog/visualizza-risposta-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-view-replies',
  template: `
    <div class="container-fluid d-flex flex-column justify-content-center">
      <div *ngFor="let r of replies" class="p-2">
        <div class="card" style="width: auto;">
          <div class="card-body">
            <div class="row">
              <span class="card-title" [innerHTML]="r.autore.username + ' [' + r.autore.email + ' #' + r.id + '] replies to'"></span>
            </div>
            <div class="row">
              <span class="card-subtitle mb-2 text-body-secondary" [innerHTML]="'Comment #' + r.padre.id"></span>
            </div>
            <div class="row">
              <span class="card-text" [innerHTML]="r.testo"></span>
            </div>
            <span class="row mt-2">
              <button mat-fab extended color="basic" (click)="passId(r.id)">
                <mat-icon>reply</mat-icon>
                Reply
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ],
  providers: [DialogService]
})
export class ViewRepliesComponent implements OnInit {
  replies: VisualizzaRispostaDTO[] = [];

  constructor(private dialog: DynamicDialogRef, private config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.replies = this.config.data;
  }

  passId(id: number) {
    this.dialog.close(id);
  }

}

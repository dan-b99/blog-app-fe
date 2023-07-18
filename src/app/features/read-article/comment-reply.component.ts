import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BlogService } from 'src/app/shared/blog.service';
import { AggiuntaCommentoDTO } from 'src/app/shared/models/blog/aggiunta-commento-dto.model';
import { AggiuntaRispostaDTO } from 'src/app/shared/models/blog/aggiunta-risposta-dto.model';
import { VisualizzaArticoloDTO } from 'src/app/shared/models/blog/visualizza-articolo-dto.model';
import { VisualizzaCommentoDTO } from 'src/app/shared/models/blog/visualizza-commento-dto.model';
import { VisualizzaRispostaDTO } from 'src/app/shared/models/blog/visualizza-risposta-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-comment-reply',
  template: `
     <mat-card class="p-2">
        <mat-card-header>
            <mat-card-title-group>
              <mat-card-title>
                <span><strong>Comments</strong></span>
              </mat-card-title>
              <mat-card-subtitle class="mb-3">
                <span><em>Insert a comment or reply to others</em></span>
              </mat-card-subtitle>
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            <div class="row mb-2">
              <form [formGroup]="commentForm">
                <mat-form-field style="width:60%">
                  <mat-label>Leave a comment</mat-label>
                  <textarea #textHere formControlName="comment" matInput [placeholder]="isReply ? 'Reply...' : 'Comment here...'"></textarea>
                </mat-form-field>
                <button mat-fab extended color="basic" class="ms-3" (click)=" isReply ? addingRep() : addComment()">
                  <mat-icon>reply</mat-icon>
                  {{isReply ? 'Reply' : 'Comment'}}
                </button>
              </form>
            </div>
            <div *ngIf="commenti">
              <div *ngFor="let c of commenti">
                <mat-divider></mat-divider>
                <span>
                  <span class="row mt-2" [innerHTML]="'<h4><em>' + c.autore.username + ' [' + c.autore.email + ' #' + c.id + '] says:</em></h4>'"></span>
                  <span class="row" [innerHTML]="'<h4>' + c.testo + '</h4'"></span>
                </span>
                <span class="row">
                  <button mat-mini-fab color="basic" class="mb-2" (click)="addingRep(c.id)">
                    <mat-icon>reply</mat-icon>
                  </button>
                </span>
                <span class="row">
                  <button mat-fab extended color="accent" class="my-2" (click)="searchReps(c.id)">
                    <mat-icon>search</mat-icon>
                    See replies
                  </button>
                </span>
                <div *ngIf="risposte">
                  <div *ngFor="let r of risposte">
                    <mat-divider></mat-divider>
                    <span>
                      <span class="row mt-2" [innerHTML]="'<h4><em>' + r.autore.username + ' [' + r.autore.email + ' #' + r.id + '] replies:</em></h4>'"></span>
                      <span class="row" [innerHTML]="'<h4>' + r.testo + '</h4>'"></span>
                    </span>
                    <span class="row my-2">
                      <button mat-mini-fab color="basic" class="mb-2" (click)="addingRep(r.id)">
                        <mat-icon>reply</mat-icon>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
  `,
  styles: [
  ]
})
export class CommentReplyComponent implements OnInit {
  @Input() art?: VisualizzaArticoloDTO;
  commenti?: VisualizzaCommentoDTO[];
  risposte?: VisualizzaRispostaDTO[];
  commentForm: FormGroup;
  @ViewChild('textHere') textBoxInput!: ElementRef;
  isReply: boolean = false;
  idPadre?: number;

  constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private snackBar: SnackBarService, private blogService: BlogService) {
    this.commentForm = this.fb.group({
      comment: new FormControl('')
    });
  }

  async ngOnInit(): Promise<void> {
    const comments$ = this.blogService.getCommentsByArtId((Number)(this.actRoute.snapshot.params['id']));
    this.commenti = await lastValueFrom(comments$);
  }

  addComment() {
    let comment: AggiuntaCommentoDTO = {
      articolo: (Number)(this.actRoute.snapshot.params['id']),
      autore: (Number)(localStorage.getItem("USER_ID")),
      testo: this.commentForm.controls['comment'].value
    };
    this.blogService.addComment(comment).subscribe({
      error: (err: HttpErrorResponse) => this.snackBar.open(err.error.message),
      complete: () => this.snackBar.open("Comment added")
    });
    setTimeout(() => window.location.reload(), 1000);
  }

  addingRep(id?: number) {
    if(this.isReply && this.idPadre) {
      let replyToAdd: AggiuntaRispostaDTO = {
        articolo: (Number)(this.actRoute.snapshot.params['id']),
        autore: (Number)(localStorage.getItem("USER_ID")),
        padre: this.idPadre,
        testo: this.commentForm.controls['comment'].value
      }
     this.blogService.addReply(replyToAdd).subscribe({
      error: (err: HttpErrorResponse) => this.snackBar.open(err.error.message),
      complete: () => this.snackBar.open("Reply added")
     });
      setTimeout(() => window.location.reload(), 10000);
    }
    else {
      this.isReply = true;
      this.textBoxInput.nativeElement.focus();
      this.idPadre = id;
    }
  }

  searchReps(commId: number) {
    this.blogService.getRepliesByArtIdAndCommId((Number)(this.actRoute.snapshot.params['id']), commId).subscribe({
      next: (vals: VisualizzaRispostaDTO[]) => this.risposte = vals,
      error: (err: HttpErrorResponse) => this.snackBar.open(err.error.message),
      complete: () => {
        console.log("RISP", this.risposte);
        if(!this.risposte?.length) {
          this.snackBar.open("No answers yet");
        }
      }
    });
  }

}

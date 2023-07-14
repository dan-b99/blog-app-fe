import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/shared/blog.service';
import { AggiuntaCommentoDTO } from 'src/app/shared/models/blog/aggiunta-commento-dto.model';
import { AggiuntaRispostaDTO } from 'src/app/shared/models/blog/aggiunta-risposta-dto.model';
import { VisualizzaArticoloDTO } from 'src/app/shared/models/blog/visualizza-articolo-dto.model';
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
                  <textarea formControlName="comment" matInput placeholder="Comment here..."></textarea>
                </mat-form-field>
                <button mat-fab extended color="basic" class="ms-3" (click)="addComment()">
                  <mat-icon>reply</mat-icon>
                  Comment
                </button>
              </form>
            </div>
            <div *ngIf="art!.commenti">
              <div *ngFor="let c of art?.commenti">
                <mat-divider></mat-divider>
                <span>
                  <span class="row mt-2" [innerHTML]="'<h4><em>' + c.autore.username + ' [' + c.autore.email + '] says:</em></h4>'"></span>
                  <span class="row" [innerHTML]="'<h4>' + c.testo + '</h4'"></span>
                </span>
                <span class="row">
                  <button mat-mini-fab color="basic" class="mb-2" (click)="toggle()">
                    <mat-icon>reply</mat-icon>
                  </button>
                </span>
                <div *ngIf="isReplyClicked">
                  <mat-form-field style="width:60%">
                    <mat-label>Reply</mat-label>
                    <textarea [(ngModel)]="reply" matInput placeholder="Reply here..."></textarea>
                  </mat-form-field>
                  <button mat-fab extended color="basic" class="ms-3" (click)="addReply(c.id)">
                    <mat-icon>reply</mat-icon>
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
  `,
  styles: [
  ]
})
export class CommentReplyComponent {
  @Input() art?: VisualizzaArticoloDTO;
  commentForm: FormGroup;
  isReplyClicked: boolean = false;
  reply?: string

  constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private snackBar: SnackBarService, private blogService: BlogService) {
    this.commentForm = this.fb.group({
      comment: new FormControl('')
    });
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

  toggle() {
    this.isReplyClicked = !this.isReplyClicked;
    if(this.reply?.length) {
      this.reply = undefined;
    }
  }

  async addReply(commId: number) {
    let replyToAdd: AggiuntaRispostaDTO = {
      articolo: (Number)(this.actRoute.snapshot.params['id']),
      autore: (Number)(localStorage.getItem("USER_ID")),
      padre: commId,
      testo: this.reply!
    }
    console.log("ARTICOLO", this.art);
    console.log("RISPOSTA", replyToAdd);
   this.blogService.addReply(replyToAdd).subscribe({
    error: (err: HttpErrorResponse) => this.snackBar.open(err.error.message),
    complete: () => this.snackBar.open("Reply added")
   });
   setTimeout(() => window.location.reload(), 1000);
  }

}

interface buttonClicked {
  commentId: number,
  isClicked: boolean
}

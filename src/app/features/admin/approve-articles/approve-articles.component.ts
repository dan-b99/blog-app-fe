import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BlogService } from 'src/app/shared/blog.service';
import { VisualizzaArticoloDTO } from 'src/app/shared/models/blog/visualizza-articolo-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-approve-articles',
  template: `
    <div *ngIf="toApproveArticles.length; else empty" class="container-fluid d-flex justify-content-left mt-3">
      <div *ngFor="let articolo of toApproveArticles">
        <mat-card class="mt-4 p-2 ms-2 me-3">
          <mat-card-header>
            <mat-card-title-group>
              <mat-card-title [innerHTML]="articolo.titolo"></mat-card-title>
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            <span [innerHTML]="textSeparator(articolo.contenuto)"></span>
            <button class="btn btn-secondary btn-sm mt-3" (click)="reading(articolo.id)">Continue reading</button>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
    <ng-template #empty>
      <div class="container-fluid d-flex justify-content-center">
        <div class="row mt-5">
          <h1><strong>There are no articles to be approved...</strong></h1>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
  ]
})
export class ApproveArticlesComponent implements OnInit {
  toApproveArticles: VisualizzaArticoloDTO[] = [];
  regex = /<img[^>]*>/;
  
  constructor(private blogService: BlogService, private sb: SnackBarService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    const obs$ = this.blogService.getNotApprovedArticles();
    this.toApproveArticles = await lastValueFrom(obs$);
  }

  textSeparator(content: string): string {
    if(content.startsWith('<p><img')) {
      const repl = content.replace(this.regex, '');
      return repl.length > 155 ? repl.slice(0, 156) : content;
    }
    return content.length > 155 ? content.slice(0, 156) + '\n...' : content;
  }

  reading(id: number) {
    this.router.navigateByUrl("/to-approve/" + id);
  }
}

import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { BlogService } from 'src/app/shared/blog.service';
import { VisualizzaVotoDTO } from 'src/app/shared/models/blog/visualizza-voto-dto.model';

@Component({
  selector: 'app-view-votes',
  template: `
    <div class="container-fluid d-flex flex-column justify-content-center">
      <p-tabView>
        <p-tabPanel header="Likes" [disabled]="!likes?.length">
          <ng-template pTemplate="header">
            <span>Likes</span>
          </ng-template>
          <span *ngFor="let l of likes" class="row p-2">
            <span class="col-12">
              {{'#' + l.id + ' | ' + l.utente.email}}
            </span>
          </span>
        </p-tabPanel>
        <p-tabPanel header="Dislikes" [disabled]="!dislikes?.length">
          <ng-template pTemplate="header">
            <span>Dislikes</span>
          </ng-template>
          <span *ngFor="let d of dislikes">
          {{'#' + d.id + ' | ' + d.utente.email}}
          </span>
        </p-tabPanel>
      </p-tabView>
    </div>
  `,
  styles: [
  ],
  providers: [DialogService]
})
export class ViewVotesComponent implements OnInit {
  likes?: VisualizzaVotoDTO[];
  dislikes?: VisualizzaVotoDTO[];

  constructor(private dialog: DynamicDialogRef, private config: DynamicDialogConfig, private blogService: BlogService) { }

  async ngOnInit(): Promise<void> {
    const likes$ = this.blogService.getLikesByArtId(this.config.data);
    const dislikes$ = this.blogService.getDislikesByArtId(this.config.data);
    this.likes = await lastValueFrom(likes$);
    this.dislikes = await lastValueFrom(dislikes$);
  }

}

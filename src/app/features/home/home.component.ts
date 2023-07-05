import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BlogService } from 'src/app/shared/blog.service';
import { enviroment } from 'src/app/shared/enviroment';
import { VisualizzaArticoloDTO } from 'src/app/shared/models/blog/visualizza-articolo-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: string = enviroment.name!;
  articles?: VisualizzaArticoloDTO[];
  regex = /<img[^>]*>/;
  imgHTML?: string;
  bodyHTML?: string;

  constructor(private router: Router, private blogService: BlogService, private snackbar: SnackBarService) { }

  private imgSearch() {
  //   console.log("ARTICOLI", this.articles);
  //   if(this.articles) {
  //     const contenuto: string[] = this.articles.flatMap((val: VisualizzaArticoloDTO) => val.contenuto);
  //     let matchings = null;
  //     contenuto.forEach((val: string) => matchings = this.regex.exec(val));
  //     console.log("MATCHINGS", matchings);
  //     if(matchings) {
  //       this.imgHTML = matchings[0];
  //     }
  //   }
  }
    
  private bodyAssignment() {
    //this.bodyHTML = this.imgHTML ? this.formValues?.value.corpo.replace(this.regex, '') : this.formValues?.value.corpo;
  }

  async execSub() {
    const obs$ = this.blogService.getArticles();
    this.articles = await lastValueFrom(obs$);
  }
  
  async ngOnInit() {
    await this.execSub();
    console.log("ARTICOLI", this.articles);
  }
}

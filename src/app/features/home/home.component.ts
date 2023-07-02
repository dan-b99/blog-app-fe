import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private blogService: BlogService, private snackbar: SnackBarService) { }
  
  clickMe() {
    this.router.navigateByUrl("write");
  }
  
  ngOnInit(): void {
    this.blogService.getArticles().subscribe({
      next: (val: VisualizzaArticoloDTO[]) => this.articles = val,
      error: (err: HttpErrorResponse) => this.snackbar.open(err.error.message)
    });
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BlogService } from 'src/app/shared/blog.service';
import { VisualizzaArticoloDTO } from 'src/app/shared/models/blog/visualizza-articolo-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: VisualizzaArticoloDTO[] = [];
  orderForm: FormGroup;
  regex = /<img[^>]*>/;

  constructor(private router: Router, private blogService: BlogService, private snackbar: SnackBarService, fb: FormBuilder) { 
    this.orderForm = fb.group({
      asc: new FormControl<boolean>(false),
      desc: new FormControl<boolean>(false),
      likes: new FormControl<boolean>(false)
    });
  }

  textSeparator(content: string): string {
    return content.length > 155 ? content.slice(0, 156) + '\n...' : content;
  }

  async execSub() {
    const obs$ = this.blogService.getArticles();
    this.articles = await lastValueFrom(obs$);
  }

  async clickMe() {
    if(this.orderForm.value.asc) {
      this.orderForm.controls['desc'].disable();
      this.orderForm.controls['likes'].disable();
      this.blogService.getAllOrderedByLikesAsc().subscribe({
        next: (vals: VisualizzaArticoloDTO[]) => this.articles = vals,
        error: (err: HttpErrorResponse) => this.snackbar.open(err.error.message)
      });
    }
    else if(this.orderForm.value.desc) {
      this.orderForm.controls['asc'].disable();
      this.orderForm.controls['likes'].disable();
      this.blogService.getAllOrderedByVotesDesc().subscribe({
        next: (vals: VisualizzaArticoloDTO[]) => this.articles = vals,
        error: (err: HttpErrorResponse) => this.snackbar.open(err.error.message)
      });
    }
    else if(this.orderForm.value.likes) {
      this.orderForm.controls['asc'].disable();
      this.orderForm.controls['desc'].disable();
      this.blogService.getAllOrderedByLikes().subscribe({
        next: (vals: VisualizzaArticoloDTO[]) => this.articles = vals,
        error: (err: HttpErrorResponse) => this.snackbar.open(err.error.message)
      });
    }
    else {
      this.orderForm.enable();
      await this.execSub();
    }
  }
  
  async ngOnInit() {
    await this.execSub();
  }

  reading(id: number) {
    this.router.navigateByUrl("/read/" + id);
  }
}

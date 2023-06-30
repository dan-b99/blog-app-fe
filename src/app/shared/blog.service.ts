import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AggiuntaArticoloDTO } from './models/blog/aggiunta-articolo-dto.model';
import { Observable } from 'rxjs';
import { enviroment } from './enviroment';
import { VisualizzaArticoloDTO } from './models/blog/visualizza-articolo-dto.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  addArticle(art: AggiuntaArticoloDTO): Observable<void> {
    return this.http.post<void>(enviroment.endpoint + "/articles/add", art);
  }

  getArticles(): Observable<VisualizzaArticoloDTO[]> {
    return this.http.get<VisualizzaArticoloDTO[]>(enviroment.endpoint + "/articles/all");
  }
}

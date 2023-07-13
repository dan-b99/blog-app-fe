import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AggiuntaArticoloDTO } from './models/blog/aggiunta-articolo-dto.model';
import { Observable } from 'rxjs';
import { enviroment } from './enviroment';
import { VisualizzaArticoloDTO } from './models/blog/visualizza-articolo-dto.model';
import { ValidazioneDinamicaBlogDTO } from './models/blog/validazione-dniamica-blog-dto.model';
import { AggiuntaCategoriaDTO } from './models/blog/aggiunta-categoria-dto.model';
import { VisualizzaCategoriaDTO } from './models/blog/visualizza-categoria-dto.model';
import { AggiuntaVotoDTO } from './models/blog/aggiunta-voto-dto.model';
import { AggiuntaCommentoDTO } from './models/blog/aggiunta-commento-dto.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  addCategory(category: AggiuntaCategoriaDTO): Observable<void> {
    return this.http.post<void>(enviroment.endpoint + "/categories/add", category);
  }

  getCategories(): Observable<VisualizzaCategoriaDTO[]> {
    return this.http.get<VisualizzaCategoriaDTO[]>(enviroment.endpoint + "/categories/all");
  }

  addArticle(art: AggiuntaArticoloDTO): Observable<void> {
    return this.http.post<void>(enviroment.endpoint + "/articles/add", art);
  }

  getArticleById(id: number): Observable<VisualizzaArticoloDTO> {
    return this.http.get<VisualizzaArticoloDTO>(enviroment.endpoint + "/articles/approved/" + id);
  }

  notApprovedById(id: number): Observable<VisualizzaArticoloDTO> {
    return this.http.get<VisualizzaArticoloDTO>(enviroment.endpoint + "/articles/not-approved/" + id);
  }

  getArticles(): Observable<VisualizzaArticoloDTO[]> {
    return this.http.get<VisualizzaArticoloDTO[]>(enviroment.endpoint + "/articles/all-approved");
  }

  getNotApprovedArticles(): Observable<VisualizzaArticoloDTO[]> {
    return this.http.get<VisualizzaArticoloDTO[]>(enviroment.endpoint + "/articles/not-approved");
  }

  getArticlesByKeyword(keyword: string): Observable<VisualizzaArticoloDTO[]> {
    return this.http.get<VisualizzaArticoloDTO[]>(enviroment.endpoint + "/articles/by-keyword?keyword=" + keyword);
  }

  getArticlesByTags(tags: string[]): Observable<VisualizzaArticoloDTO[]> {
    return this.http.post<VisualizzaArticoloDTO[]>(enviroment.endpoint + "/articles/by-tags", tags);
  }

  getArticlesByCategories(catIds: number[]): Observable<VisualizzaArticoloDTO[]> {
    return this.http.post<VisualizzaArticoloDTO[]>(enviroment.endpoint + "/articles/by-categories", catIds);
  }

  setBlogValidation(validationObj: ValidazioneDinamicaBlogDTO): Observable<void> {
    return this.http.put<void>(enviroment.endpoint + "/articles/custom-blog-validation", validationObj);
  }

  approveArticle(id: number): Observable<void> {
    return this.http.put<void>(enviroment.endpoint + "/articles/approve", id);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(enviroment.endpoint + "/articles/delete/" + id);
  }

  setVote(vote: AggiuntaVotoDTO): Observable<void> {
    return this.http.post<void>(enviroment.endpoint + "/articles/voted", vote);
  }

  addComment(comment: AggiuntaCommentoDTO): Observable<void> {
    return this.http.post<void>(enviroment.endpoint + "/articles/add-comment", comment);
  }
}

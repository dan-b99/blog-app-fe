import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AggiuntaArticoloDTO } from './models/blog/aggiunta-articolo-dto.model';
import { Observable } from 'rxjs';
import { enviroment } from './enviroment';
import { VisualizzaArticoloDTO } from './models/blog/visualizza-articolo-dto.model';
import { ValidazioneDinamicaDTO } from './models/blog/validazione-dniamica-dto.model';
import { AggiuntaCategoriaDTO } from './models/blog/aggiunta-categoria-dto.model';
import { VisualizzaCategoriaDTO } from './models/blog/visualizza-categoria-dto.model';

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
    return this.http.get<VisualizzaArticoloDTO>(enviroment.endpoint + "/articles/" + id);
  }

  getArticles(): Observable<VisualizzaArticoloDTO[]> {
    return this.http.get<VisualizzaArticoloDTO[]>(enviroment.endpoint + "/articles/all");
  }

  setValidation(validationObj: ValidazioneDinamicaDTO): Observable<void> {
    return this.http.put<void>(enviroment.endpoint + "/articles/custom-validation", validationObj);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtenteOutput } from './models/auth/utente-output.model';
import { enviroment } from './enviroment';
import { RegistrazioneDTO } from './models/auth/registrazione-dto.model';
import { LoginDTO } from './models/auth/login-dto.model';
import { Autenticazione } from './models/auth/autenticazione-dto.model';
import { RuoloOutputDTO } from './models/auth/ruolo-output-dto.model';
import { ValidazioneDinamicaPasswordDTO } from './models/auth/validazione-dinamica-password-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(utente: RegistrazioneDTO): Observable<UtenteOutput> {
    return this.http.post<UtenteOutput>(enviroment.endpoint + '/users/signIn', utente, {
      headers: {
        skip: "true"
      }
    });
  }

  login(utente: LoginDTO): Observable<Autenticazione> {
    return this.http.post<Autenticazione>(enviroment.endpoint + '/users/login', utente, {
      headers: {
        skip: "true"
      }
    });
  }

  findRoles(): Observable<RuoloOutputDTO[]> {
    return this.http.get<RuoloOutputDTO[]>(enviroment.endpoint + '/users/user-roles');
  }

  findAll(): Observable<UtenteOutput[]> {
    return this.http.get<UtenteOutput[]>(enviroment.endpoint + "/users/all");
  }
  
  setPasswordValidation(validaionObj: ValidazioneDinamicaPasswordDTO): Observable<void> {
    return this.http.put<void>(enviroment.endpoint + "/users/custom-password-validation", validaionObj);
  }

  setBlocked(id: number): Observable<void> {
    return this.http.put<void>(enviroment.endpoint + "/users/set-block", id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(enviroment.endpoint + "/users/delete/" + id);
  }
}

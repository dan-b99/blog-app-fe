import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RuoloOutputDTO } from 'src/app/shared/models/auth/ruolo-output-dto.model';
import { UtenteOutput } from 'src/app/shared/models/auth/utente-output.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-users-handling',
  template: `
    <div class="container-fluid d-flex justify-content-center">
      <table class="table table-hover mt-5 p-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Roles</th>
            <th></th>
          </tr>
          </thead>
        <tbody>
          <tr *ngFor="let u of users">
            <td>{{u.id}}</td>
            <td>{{u.nome}}</td>
            <td>{{u.cognome}}</td>
            <td>{{u.email}}</td>
            <td>
              <span *ngFor="let r of u.ruoli">{{r.authority === 'ROLE_ADMIN' ? 'Amministratore ' : 'Utente '}}</span>
            </td>
            <td>
              <button mat-icon-button color="primary">
                <mat-icon>block</mat-icon>
              </button>
              <button mat-icon-button color="primary">
                <mat-icon>delete</mat-icon>
             </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
  ]
})
export class UsersHandlingComponent implements OnInit {

  users: UtenteOutput[] = [];
  ruoli: string[] = [];

  constructor(private userService: UserService, private sb: SnackBarService) { }

  async ngOnInit(): Promise<void> {
    const obs$ = this.userService.findAll();
    this.users = await lastValueFrom(obs$);
  }

}

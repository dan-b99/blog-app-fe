import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
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
            <th>Status</th>
            <th></th>
          </tr>
          </thead>
        <tbody>
          <tr *ngFor="let u of users">
            <td>{{u.id}}</td>
            <td>{{u.nome}}</td>
            <td>{{u.cognome}}</td>
            <td>{{u.email}}</td>
            <td>{{'User'}}</td>
            <td>{{u.bloccato ? 'Blocked' : 'Not blocked'}}</td>
            <td>
              <button mat-icon-button color="primary" (click)="setBlockState(u.id, u.bloccato)">
                <mat-icon>{{u.bloccato ? 'restore' : 'block'}}</mat-icon>
              </button>
              <button mat-icon-button color="primary" (click)="deleteUser(u.id)">
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

  constructor(private userService: UserService, private sb: SnackBarService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    const obs$ = this.userService.findAll();
    this.users = await lastValueFrom(obs$);
  }

  private blockCheck() {

  }

  setBlockState(id: number, state: boolean) {
    this.userService.setBlocked(id).subscribe({
      error: (err: HttpErrorResponse) => this.sb.open(err.error.message) 
    });
    if(!state) {
      this.sb.open("The user has been blocked")
    }
    else {
      this.sb.open("The user has been unblocked")
    }
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe({
      error: (err: HttpErrorResponse) => this.sb.open(err.error.message),
      complete: () => this.sb.open("The user has been deleted")
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000)
  }
}

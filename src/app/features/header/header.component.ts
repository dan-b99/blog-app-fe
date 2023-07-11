import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { enviroment } from 'src/app/shared/enviroment';
import { RuoloOutputDTO } from 'src/app/shared/models/auth/ruolo-output-dto.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar navbar-expand-lg bg-body-tertiary p-3" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand">IDEASharing</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" *ngIf="userId" routerLink="home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" *ngIf="userId" routerLink="write">Write something</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" *ngIf="roleAdmin" routerLink="validate">Validations</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" *ngIf="roleAdmin" routerLink="add-category">Add Categories</a>
        </li>
      <li class="nav-item">
        <a class="nav-link active" [routerLink]="userId ? 'logout' : 'login'" [innerText]="userId ? 'Logout' : 'Accedi'"></a>
      </li>
      <li class="nav-item">
          <a *ngIf="!userId" class="nav-link active" routerLink="signUp">Registrati</a>
      </li>
        <li class="nav-item" *ngIf="!userId">
          <a class="nav-link active" href="#">About</a>
        </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" [innerText]="name ? 'Welcome back, ' + name : ''"></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  userId: string | null = enviroment.user_id;
  name: string | null = enviroment.name;
  roleUser: string | null = null;
  roleAdmin: string | null = null;
  
  constructor(private userService: UserService, private sb: SnackBarService) { }

  ngOnInit(): void {
    if(this.userId) {
      this.getRoles();
    }
  }

  private getRoles() {
    const roles = localStorage.getItem("roles");
    if(roles?.includes("ROLE_ADMIN")) {
      this.roleAdmin = "ROLE_ADMIN";
    }
  }
}

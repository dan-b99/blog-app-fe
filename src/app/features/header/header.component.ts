import { Component, OnInit } from '@angular/core';
import { enviroment } from 'src/app/shared/enviroment';
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
          <a class="nav-link active" *ngIf="userId" routerLink="search">Search articles</a>
        </li>
        <li class="nav-item dropdown" *ngIf="roleAdmin">
          <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Administration
          </a>
          <ul class="dropdown-menu">
            <li class="nav-item">
              <a class="nav-link active" routerLink="add-category">Add Categories</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" routerLink="approve">Approve articles</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" routerLink="users-handling">Users handling</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" routerLink="validate">Validations</a>
            </li>
          </ul>
        </li>
      <li class="nav-item">
        <a class="nav-link active" [routerLink]="userId ? 'logout' : 'login'" [innerText]="userId ? 'Logout' : 'Login'"></a>
      </li>
      <li class="nav-item">
          <a *ngIf="!userId" class="nav-link active" routerLink="signUp">Sign up</a>
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

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { enviroment } from 'src/app/shared/enviroment';

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
        <a *ngIf="userId" class="nav-link" routerLink="home">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="userId ? 'logout' : 'login'" [innerText]="userId ? 'Logout' : 'Accedi'"></a>
      </li>
      <li class="nav-item">
          <a *ngIf="!userId" class="nav-link" routerLink="signUp">Registrati</a>
      </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
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
  
  constructor() { }

  ngOnInit(): void {
    console.log("INIZIALIZZO", this.userId);
  }
}

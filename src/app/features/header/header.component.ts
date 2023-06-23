import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar navbar-expand-lg bg-body-tertiary p-3" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand">BloggingApp</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
      <li class="nav-item">
        <a [ngClass]="{'nav-link': true, 'active': boolArr.isHome}" routerLink="home" (click)="isClicked($event)">Home</a>
      </li>
      <li class="nav-item">
        <a [ngClass]="{'nav-link': true, 'active': boolArr.isLogin}" routerLink="login" (click)="isClicked($event)">Accedi</a>
      </li>
      <li class="nav-item">
          <a [ngClass]="{'nav-link': true, 'active': boolArr.isSignUp}" routerLink="signUp" (click)="isClicked($event)">Registrati</a>
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
  boolArr: menuEntries;
  
  constructor() {
    this.boolArr = {
      isHome: false,
      isSignUp: true,
      isLogin: false,
      isAbout: false
    };
  }

  ngOnInit(): void {
    
  }

  isClicked(event: any) {
    
    if(event.target.href.endsWith('signUp')) {
      this.boolArr!.isHome = false;
      this.boolArr!.isAbout = false;
      this.boolArr!.isLogin = false;
      this.boolArr!.isSignUp = true;
    }
    else if(event.target.href.endsWith('login')) {
      this.boolArr!.isLogin = true;
      this.boolArr!.isHome = false;
      this.boolArr!.isAbout = false;
      this.boolArr!.isSignUp = false;
    }
    else if(event.target.href.endsWith('home')) {
      this.boolArr!.isHome = true;
      this.boolArr!.isAbout = false;
      this.boolArr!.isLogin = false;
      this.boolArr!.isSignUp = false;
    }
  }
}

interface menuEntries {
  isHome: boolean,
  isSignUp: boolean,
  isLogin: boolean,
  isAbout: boolean
}

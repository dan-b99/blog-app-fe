import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logout',
  template: `
  `,
  styles: [
  ]
})
export class UserLogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
   localStorage.removeItem("USER_ID");
   localStorage.removeItem("jwt");
   localStorage.removeItem("name");
   this.router.navigateByUrl("/login").then(() => window.location.reload());
  }
}

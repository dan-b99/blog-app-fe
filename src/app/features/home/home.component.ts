import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { enviroment } from 'src/app/shared/enviroment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: string = enviroment.name!;
  isClicked: boolean = false;

  constructor(private router: Router) { }

  clickMe() {
    this.isClicked = !this.isClicked;
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { enviroment } from 'src/app/shared/enviroment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: string = enviroment.name!;
  isTextVisible: boolean = false;
  formValue?: string;

  constructor(private router: Router) { }

  toggle() {
    this.isTextVisible = !this.isTextVisible;
  }

  catchData(event: string) {
    console.log("METODO CATCH: ", event);
    this.formValue = event;
  }

  ngOnInit(): void { }

}

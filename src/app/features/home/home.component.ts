import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  formValues?: FormGroup;

  constructor(private router: Router) { }

  toggle() {
    this.isTextVisible = !this.isTextVisible;
  }

  catchData(event: FormGroup) {
    console.log("METODO CATCH: ", event);
    this.formValues = event;
  }

  ngOnInit(): void { }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { enviroment } from 'src/app/shared/enviroment';
import HTMLParser from 'html-to-json-parser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: string = enviroment.name!;
  isTextVisible: boolean = false;
  formValues?: FormGroup;
  jsonP?: any;

  constructor(private router: Router) { }

  toggle() {
    this.isTextVisible = !this.isTextVisible;
  }

  private async jsonConv() {
    const res = await HTMLParser(this.formValues!.value.corpo, false);
    console.log("CONV", res);
  }

  async catchData(event: FormGroup) {
    console.log("METODO CATCH: ", event);
    this.formValues = event;
    await this.jsonConv();
  }


}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { enviroment } from 'src/app/shared/enviroment';
import { JSONToHTML, JSONType } from 'html-to-json-parser'; 
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
  jsonParsed?: any;
  imgVal?: any;
  imgHtml?: any;

  constructor(private router: Router) { }

  toggle() {
    this.isTextVisible = !this.isTextVisible;
  }

  private async jsonConv() {
    const res = await HTMLParser(this.formValues!.value.corpo, false);
    console.log("CONV", res);
    this.jsonParsed = res;
  }

  private async imgHtmlConv() {
    console.log("CORPO JSON", this.jsonParsed);
    this.imgVal = this.jsonParsed.content.find((element: any) => element.type === 'img');
    console.log("IMG ATTRIBUTES", this.imgVal);
    this.imgHtml = await JSONToHTML(this.imgVal, true);
  }

  async catchData(event: FormGroup) {
    console.log("METODO CATCH: ", event);
    this.formValues = event;
    await this.jsonConv();
    await this.imgHtmlConv();
  }


}

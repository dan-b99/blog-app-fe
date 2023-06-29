import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { enviroment } from 'src/app/shared/enviroment';
import parse from 'html-dom-parser';

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
  contentBody?: any;

  constructor(private router: Router) { }

  toggle() {
    this.isTextVisible = !this.isTextVisible;
  }
  
  catchData(event: FormGroup) {
    console.log("METODO CATCH: ", event);
    this.formValues = event;
    this.jsonConv();
    this.imgSearch();
    this.bodyAssignment();
  }
  
  private jsonConv() {
    this.jsonParsed = parse(this.formValues!.value.corpo);
    console.log("PARSED", this.jsonParsed);
  }

  private imgSearch() {
    this.jsonParsed.map(
      (singleObj: any) => {
        if(singleObj.children.find((element: any) => element.name === 'img')) {
          this.imgVal = singleObj.children;
        }
      }
    );
    console.log("CERCO IMMAGINE", this.imgVal);
  }

  private bodyAssignment() {
    this.contentBody = this.jsonParsed.filter((element: any) => element.children[0].name !== 'img');
    console.log("CORPO", this.contentBody);
  }
}

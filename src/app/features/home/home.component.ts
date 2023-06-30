import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('imgTest') imgEl?: ElementRef;
  @ViewChild('testo') textEl?: ElementRef;
  @ViewChild('title') titleTest?: ElementRef;

  constructor(private router: Router) { }

  
  toggle() {
    this.isTextVisible = !this.isTextVisible;
  }
  
  catchData(event: FormGroup) {
    console.log("METODO CATCH: ", event);
    this.formValues = event;
    console.log("TITOLO HTML", this.titleTest?.nativeElement);
    this.jsonConv();
    this.imgSearch();
    this.bodyAssignment();
    this.settingHTML();
  }
  
  private jsonConv() {
    this.jsonParsed = parse(this.formValues!.value.corpo);
    console.log("PARSED", this.jsonParsed);
  }
  
  private imgSearch() {
    this.jsonParsed.map(
      (singleObj: any) => {
        if(singleObj.children.find((element: any) => element.name === 'img')) {
          this.imgVal = singleObj;
        }
      }
      );
      console.log("CERCO IMMAGINE", this.imgVal);
    }
    
    private bodyAssignment() {
      //TODO: for con indice su element.children per evitare di hardcodare l'indice (o while idx<element.children.length)
      this.contentBody = this.jsonParsed.filter((element: any) => element.children[0].name !== 'img');
      this.contentBody.map((single: any) => {
        
      });
    }

    private settingHTML() {
      const htmlImg = this.imgEl?.nativeElement;
      console.log("HTML IMG", htmlImg);
    }
  }

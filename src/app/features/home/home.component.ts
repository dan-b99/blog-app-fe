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
  isTextVisible: boolean = false;
  formValues?: FormGroup;
  regex = /<img[^>]*>/;
  imgHTML?: string;
  bodyHTML?: string;

  constructor(private router: Router) { }
  
  toggle() {
    this.isTextVisible = !this.isTextVisible;
  }
  
  catchData(event: FormGroup) {
    console.log("METODO CATCH: ", event);
    this.formValues = event;
    this.imgSearch();
    this.bodyAssignment();
  }
  
  private imgSearch() {
    const matchings = this.regex.exec(this.formValues?.value.corpo);
    if(matchings) {
      this.imgHTML = matchings[0];
    }
  }
    
    private bodyAssignment() {
      this.bodyHTML = this.imgHTML ? this.formValues?.value.corpo.replace(this.regex, '') : this.formValues?.value.corpo;
    }
  }

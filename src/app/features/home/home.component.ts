import { Component } from '@angular/core';
import { enviroment } from 'src/app/shared/enviroment';
import { UtenteOutput } from 'src/app/shared/models/auth/utente-output.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: string = enviroment.name!;

}

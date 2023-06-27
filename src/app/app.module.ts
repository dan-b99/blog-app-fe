import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './features/header/header.component';
import { HomeComponent } from './features/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './features/user/user-registration/user-registration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserLoginComponent } from './features/user/user-login/user-login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserLogoutComponent } from './features/user/user-logout/user-logout.component';
import { RitchTextComponent } from './features/ritch-text/ritch-text.component';
import { EditorModule } from 'primeng/editor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UserLogoutComponent,
    HomeComponent,
    RitchTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

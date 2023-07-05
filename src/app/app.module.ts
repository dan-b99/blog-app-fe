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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserLogoutComponent } from './features/user/user-logout/user-logout.component';
import { RitchTextComponent } from './features/ritch-text/ritch-text.component';
import { EditorModule } from 'primeng/editor';
import { WriteArticleComponent } from './features/write-article/write-article.component';
import { AuthenticationInterceptor } from './shared/authentication.interceptor';
import { ValidationComponent } from './features/admin/validation/validation.component';
import { MatSelectModule } from '@angular/material/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { AddCategoriesComponent } from './features/admin/add-categories/add-categories.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UserLogoutComponent,
    HomeComponent,
    RitchTextComponent,
    WriteArticleComponent,
    ValidationComponent,
    AddCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    EditorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

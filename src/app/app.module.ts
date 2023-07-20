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
import { MatChipsModule } from '@angular/material/chips';
import { ChipsModule } from 'primeng/chips';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MatDividerModule } from '@angular/material/divider';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { AddCategoriesComponent } from './features/admin/add-categories/add-categories.component';
import { QuillModule } from 'ngx-quill';
import { ReadArticleComponent } from './features/read-article/read-article.component';
import { SearchArticleComponent } from './features/search-article/search-article.component';
import { ApproveArticlesComponent } from './features/admin/approve-articles/approve-articles.component';
import { ArticleToApproveComponent } from './features/admin/approve-articles/article-to-approve/article-to-approve.component';
import { UsersHandlingComponent } from './features/admin/users-handling/users-handling.component';
import { CommentReplyComponent } from './features/read-article/comment-reply.component';
import { ViewRepliesComponent } from './features/read-article/view-replies.component';

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
    AddCategoriesComponent,
    ReadArticleComponent,
    SearchArticleComponent,
    ApproveArticlesComponent,
    ArticleToApproveComponent,
    UsersHandlingComponent,
    CommentReplyComponent,
    ViewRepliesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    ChipsModule,
    MatDividerModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    EditorModule,
    DynamicDialogModule,
    CheckboxModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

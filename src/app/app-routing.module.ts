import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserRegistrationComponent } from './features/user/user-registration/user-registration.component';
import { UserLoginComponent } from './features/user/user-login/user-login.component';
import { UserLogoutComponent } from './features/user/user-logout/user-logout.component';
import { WriteArticleComponent } from './features/write-article/write-article.component';
import { authenticationGuard } from './shared/authentication.guard';
import { ValidationComponent } from './features/admin/validation/validation.component';
import { AddCategoriesComponent } from './features/admin/add-categories/add-categories.component';
import { ReadArticleComponent } from './features/read-article/read-article.component';
import { administrationGuard } from './shared/administration.guard';
import { SearchArticleComponent } from './features/search-article/search-article.component';
import { ApproveArticlesComponent } from './features/admin/approve-articles/approve-articles.component';
import { ArticleToApproveComponent } from './features/admin/approve-articles/article-to-approve/article-to-approve.component';

const routes: Routes = [
  {path: "home", component: HomeComponent, canActivate: [authenticationGuard]},
  {path: 'signUp', component: UserRegistrationComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'logout', component: UserLogoutComponent},
  {path: 'add-category', component: AddCategoriesComponent, canActivate: [authenticationGuard, administrationGuard]},
  {path: 'write', component: WriteArticleComponent, canActivate: [authenticationGuard]},
  {path: 'read/:id', component: ReadArticleComponent, canActivate: [authenticationGuard]},
  {path: 'validate', component: ValidationComponent, canActivate: [authenticationGuard, administrationGuard]},
  {path: 'search', component: SearchArticleComponent, canActivate: [authenticationGuard]},
  {path: 'approve', component: ApproveArticlesComponent, canActivate: [authenticationGuard, administrationGuard]},
  {path: 'to-approve/:id', component: ArticleToApproveComponent, canActivate: [authenticationGuard, administrationGuard]},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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

const routes: Routes = [
  {path: "home", component: HomeComponent, canActivate: [authenticationGuard]},
  {path: 'signUp', component: UserRegistrationComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'logout', component: UserLogoutComponent},
  {path: 'add-category', component: AddCategoriesComponent, canActivate: [authenticationGuard]},
  {path: 'write', component: WriteArticleComponent, canActivate: [authenticationGuard]},
  {path: 'validate', component: ValidationComponent, canActivate: [authenticationGuard]},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

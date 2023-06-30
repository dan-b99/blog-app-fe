import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserRegistrationComponent } from './features/user/user-registration/user-registration.component';
import { UserLoginComponent } from './features/user/user-login/user-login.component';
import { UserLogoutComponent } from './features/user/user-logout/user-logout.component';
import { WriteArticleComponent } from './features/write-article/write-article.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: 'signUp', component: UserRegistrationComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'logout', component: UserLogoutComponent},
  {path: 'write', component: WriteArticleComponent},
  {path: '**', redirectTo: 'signUp'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserRegistrationComponent } from './features/user/user-registration/user-registration.component';
import { UserLoginComponent } from './features/user/user-login/user-login.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: 'signUp', component: UserRegistrationComponent},
  {path: 'login', component: UserLoginComponent},
  {path: '**', redirectTo: 'signUp'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

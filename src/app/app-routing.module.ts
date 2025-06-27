//app-routing-module

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UsersListComponent } from './users-list/users-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" }, // Redireciona raiz para login
  {path: "signup", component: SignupComponent },
  {path: "edit-user", component: EditUserComponent},
  { path: 'users', component: UsersListComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

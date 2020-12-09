import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DnisComponent } from './components/dnis/dnis.component';
import {FieldsComponent} from './components/fields/fields.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import {FieldPreviewComponent} from './components/field-preview/field-preview.component';
import { AuthGuard } from './auth.guard';
import {TypeOfComponent} from './components/type-of/type-of.component';
import {SigninUserComponent} from './components/signin-user/signin-user.component';
import { MainDirectorComponent } from './components/main-director/main-director.component';
import {MainAdminComponent} from "./components/main-admin/main-admin.component";
import {MainInstructorComponent} from "./components/main-instructor/main-instructor.component";
import {HelpComponent} from "./components/help/help.component";

const routes: Routes = [
  // Solicitar login: canActivate: [AuthGuard], data: roles

  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },

  { path: 'signin', component: SigninUserComponent},
  { path: 'help', component: HelpComponent},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard], data: {role: 'user'} },

  { path: 'signinAdmin', component: SigninComponent },
  { path: 'mainD', component: MainDirectorComponent,  canActivate: [AuthGuard], data: {role: 'director'} },
  { path: 'mainA', component: MainAdminComponent, canActivate: [AuthGuard], data: {role: 'admin'} },
  { path: 'mainI', component: MainInstructorComponent, canActivate: [AuthGuard], data: {role: 'instructor'}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

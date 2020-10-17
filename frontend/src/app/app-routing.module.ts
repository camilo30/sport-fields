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

const routes: Routes = [
  // Solicitar login: canActivate: [AuthGuard]

  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },

  { path: 'signin', component: SigninUserComponent},
  { path: 'main', component: MainComponent  },

  { path: 'signinAdmin', component: SigninComponent },
  { path: 'mainD', component: MainDirectorComponent },

  { path: 'fields', component: FieldsComponent },
  { path: 'dni', component:  DnisComponent },
  { path: 'fields/:id', component: FieldPreviewComponent },
  { path: 'types', component: TypeOfComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

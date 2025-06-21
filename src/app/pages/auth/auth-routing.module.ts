import { LoginEtudiantComponent } from './login-etudiant/login-etudiant.component';
import { LoginEnseignantComponent } from './login-enseignant/login-enseignant.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/enseignant',
    component: LoginEnseignantComponent
  },
  {
    path: 'login/etudiant',
    component : LoginEtudiantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

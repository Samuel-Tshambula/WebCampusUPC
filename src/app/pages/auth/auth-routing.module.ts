import { LoginComponent } from './login/login.component';
import { RegisterEnseignantComponent } from './register-enseignant/register-enseignant.component';
import { RegisterEtudiantComponent } from './register-etudiant/register-etudiant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register/etudiant',
    component: RegisterEtudiantComponent
  },
  {
    path: 'register/enseignant',
    component: RegisterEnseignantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

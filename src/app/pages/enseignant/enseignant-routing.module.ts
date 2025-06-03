import { TpComponent } from './tp/tp.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutEnseignantComponent } from './layout-enseignant/layout-enseignant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutEnseignantComponent,
    children: [
      {
        path: '', redirectTo: 'dashboard/enseignant', pathMatch: 'full'
      },
      {
        path: 'dashboard/enseignant',
        component : DashboardComponent
      },
      {
        path: 'reclamation',
        component : ReclamationComponent
      },
      {
        path: 'tp',
        component: TpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantRoutingModule { }

import { TpDetailComponent } from './tp-detail/tp-detail.component';
import { TPComponent } from './tp/tp.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DeliberationComponent } from './deliberation/deliberation.component';
import { HorairesComponent } from './horaires/horaires.component';
import { LayoutValveComponent } from './layout-valve/layout-valve.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutValveComponent,
    children: [
      {path: '', redirectTo: 'horaires', pathMatch: 'full'},
      {
        path: 'horaires',
        component: HorairesComponent
      },
      {
        path: 'deliberation',
        component: DeliberationComponent
      },
      {
        path:'reclamation',
        component: ReclamationComponent
      },
      {
        path: 'tp',
        component: TPComponent
      },
      {
        path: 'tp/edit/:id',
        component: TpDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValveRoutingModule { }

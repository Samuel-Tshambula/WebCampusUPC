import { PromotionsComponent } from './promotions/promotions.component';
import { HorairesComponent } from './horaires/horaires.component';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { DeliberationComponent } from './deliberation/deliberation.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutAdminComponent,
    children: [
      {
        path: '', redirectTo: 'dashboard/admin', pathMatch: 'full'
      },
      {
        path: 'dashboard/admin',
        component: DashboardComponent
      },
      {
        path: 'annonces',
        component: AnnoncesComponent
      },
      {
        path: 'deliberation',
        component: DeliberationComponent
      },
      {
        path: 'enseignants',
        component: EnseignantsComponent
      },
      {
        path: 'horaires',
        component: HorairesComponent
      },
      {
        path: 'promotion',
        component: PromotionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

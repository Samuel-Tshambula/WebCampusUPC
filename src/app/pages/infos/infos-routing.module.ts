import { AnnoncesDetailComponent } from './annonces-detail/annonces-detail.component';
import { ActualitesDetailComponent } from './actualites-detail/actualites-detail.component';
import { InfosLayoutComponent } from './infos-layout/infos-layout.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { ActualitesComponent } from './actualites/actualites.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InfosLayoutComponent,
    children: [
      {
        path:'', redirectTo: 'actualites', pathMatch: 'full'
      }, 
      {
        path: 'actualites',
        component: ActualitesComponent
      },
      {
        path: 'actualites/:id',
        component: ActualitesDetailComponent
      },
      {
        path: 'annonces',
        component: AnnoncesComponent
      },
      {
        path: 'annonces/:id',
        component: AnnoncesDetailComponent
      },
      {
        path: 'contact',
        component: ContactsComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfosRoutingModule { }

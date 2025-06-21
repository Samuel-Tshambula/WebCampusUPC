import { TpComponent } from './tp/tp.component';
import { ListePromotionEtudiantComponent } from './liste-promotion-etudiant/liste-promotion-etudiant.component';
import { HorairesUpdateComponent } from './horaires-update/horaires-update.component';
import { ListHoraireComponent } from './list-horaire/list-horaire.component';
import { EnseignantViewComponent } from './enseignant-view/enseignant-view.component';
import { EnseignantsUpdateComponent } from './enseignants-update/enseignants-update.component';
import { EtudiantsUpdateComponent } from './etudiants-update/etudiants-update.component';
import { CoursViewComponent } from './cours-view/cours-view.component';
import { CoursUpdateComponent } from './cours-update/cours-update.component';
import { CoursComponent } from './cours/cours.component';
import { PromotionsUpdateComponent } from './promotions-update/promotions-update.component';
import { AnnonceViewComponent } from './annonce-view/annonce-view.component';
import { AnnoncesUpdateComponent } from './annonces-update/annonces-update.component';
import { SectionUpdateComponent } from './section-update/section-update.component';
import { SectionComponent } from './section/section.component';
import { ActualiteViewComponent } from './actualite-view/actualite-view.component';
import { ActualiteUpdateComponent } from './actualite-update/actualite-update.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { FaculteUpdateComponent } from './faculte-update/faculte-update.component';
import { FaculteComponent } from './faculte/faculte.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
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
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'annonces',
        component: AnnoncesComponent
      },
      {
        path: 'annonces/edit/:id',
        component : AnnoncesUpdateComponent
      },
      {
        path: 'annonces/view/:id',
        component: AnnonceViewComponent
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
        path: 'enseignants/edit/:id',
        component: EnseignantsUpdateComponent
      },
      {
        path: 'enseignants/view/:id',
        component: EnseignantViewComponent
      },
      {
        path: 'etudiants',
        component : EtudiantsComponent
      },
      {
        path: 'etudiants/edit/:id',
        component: EtudiantsUpdateComponent
      },
      {
        path: 'horaires',
        component: HorairesComponent
      },
      {
        path: 'horaires/view/:promotionId',
        component: ListHoraireComponent
      },
      {
        path: 'horaires/edit/:id',
        component: HorairesUpdateComponent
      },
      {
        path: 'promotion',
        component: PromotionsComponent
      },
      {
        path: 'promotion/edit/:id',
        component: PromotionsUpdateComponent
      },
      {
        path: 'promotion/étudiant/list/:promotionId',
        component: ListePromotionEtudiantComponent
      },
      {
        path: 'facultes',
        component: FaculteComponent
      },
      {
        path: 'facultes/edit/:id',
        component: FaculteUpdateComponent
      },
      {
        path: 'actualites',
        component: ActualiteComponent
      },
      {
        path: 'actualites/edit/:id',
        component : ActualiteUpdateComponent
      },
      {
        path: 'actualites/view/:id',
        component : ActualiteViewComponent
      },
      {
        path:'sections',
        component: SectionComponent
      },
      {
        path: 'sections/edit/:id',
        component: SectionUpdateComponent
      },
      {
        path: 'cours',
        component: CoursComponent
      },
      {
        path: 'cours/edit/:id',
        component: CoursUpdateComponent
      },
      {
        path: 'cours/view/:id',
        component: CoursViewComponent
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
export class AdminRoutingModule { }

import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'infos',
    loadChildren: () => import('./pages/infos/infos.module').then(m => m.InfosModule)
  }
];

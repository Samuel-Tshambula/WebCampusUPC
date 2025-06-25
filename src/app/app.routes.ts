import { authGuard } from './core/guards/auth.guard';
import { teacherGuard } from './core/guards/teacher.guard';
import { authAdminGuard } from './core/guards/auth-admin.guard';
import { LoginAdminComponent } from './pages/auth/login-admin/login-admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
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
  },
  {
    path: 'valveetudiants',
    loadChildren: () => import('./pages/valve/valve.module').then(m => m.ValveModule),
    canActivate: [authGuard]
  },
  {
    path: 'enseignant',
    loadChildren: () => import('./pages/enseignant/enseignant.module').then(m => m.EnseignantModule),
    canActivate: [teacherGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authAdminGuard] 
  },
  {
    path: 'adm/lgad',
    component: LoginAdminComponent
  },
  {
    path:'**',
    component: NotFoundComponent
  }
];

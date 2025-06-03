import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'mapa-colectivos',
    loadChildren: () => import('./features/user/mapa-colectivos/mapa-colectivos.module').then(m => m.MapaColectivosPageModule)
  },
  {
    path: 'driver/home',
    loadChildren: () => import('./features/driver/home/home.module').then( m => m.DriverHomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then( m => m.HomePageModule)
  },  {
    path: 'reportes',
    loadChildren: () => import('./features/user/reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./features/user/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'reporte-chofer',
    loadChildren: () => import('./features/driver/reporte-chofer/reporte-chofer.module').then( m => m.ReporteChoferPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

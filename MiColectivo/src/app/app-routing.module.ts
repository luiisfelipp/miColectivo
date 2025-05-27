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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

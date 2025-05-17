import { Routes } from '@angular/router';
import { MapComponent } from './features/map.component';
import { DashboardComponent } from './features/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: 'map', component: MapComponent },
  { path: 'dashboard', component: DashboardComponent }
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaColectivosPage } from './mapa-colectivos.page';

const routes: Routes = [
  {
    path: '',
    component: MapaColectivosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaColectivosPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteChoferPage } from './reporte-chofer.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteChoferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteChoferPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteChoferPageRoutingModule } from './reporte-chofer-routing.module';

import { ReporteChoferPage } from './reporte-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteChoferPageRoutingModule
  ],
  declarations: [ReporteChoferPage]
})
export class ReporteChoferPageModule {}
